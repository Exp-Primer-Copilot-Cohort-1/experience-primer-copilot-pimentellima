import { left, right } from "App/Core/shared";
import { LoggerMock } from "__mocks__";
import { describe, expect, it, vi } from "vitest";
import { SendEmailError } from "../../errors/send-email.err";
import EDGE, { ISendEmailUseCase } from "../helpers/edge";
import { SendNewPasswordUseCase } from './send-new-password-use-case';

const makeSut = () => {
	const email = 'test@example.com';
	const password = 'newpassword';

	const sendEmailUseCaseMock: ISendEmailUseCase = {
		execute: vi.fn().mockReturnValue(Promise.resolve(right({ message: 'ok' })))
	};

	const spySendEmail = vi.spyOn(sendEmailUseCaseMock, 'execute');

	const sut = new SendNewPasswordUseCase(sendEmailUseCaseMock, new LoggerMock());

	return {
		sut,
		sendEmailUseCaseMock,
		email,
		password,
		spy: {
			sendEmail: spySendEmail,
		}
	}
}

describe("Send New Password Use Case (Unit)", () => {
	it("should send an email with a new password", async () => {
		const { email, password, sendEmailUseCaseMock, sut } = makeSut();

		const result = await sut.execute({ email, password });

		expect(result.isRight()).toBe(true);
		expect(sendEmailUseCaseMock.execute).toHaveBeenCalledWith({
			edge: EDGE.create_password,
			props: { password },
			title: 'Uma nova senha',
			email: email,
		});
	});

	it("should return an error if sending the email fails", async () => {
		const { email, password, sut, spy } = makeSut();

		spy.sendEmail.mockReturnValueOnce(Promise.resolve(left(new SendEmailError())));

		const result = await sut.execute({ email, password });

		expect(result.isLeft()).toBe(true);
		expect(result.extract()).toBeInstanceOf(SendEmailError);
	});
});
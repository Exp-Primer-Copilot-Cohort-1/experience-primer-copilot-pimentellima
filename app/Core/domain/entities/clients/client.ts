import { AbstractError } from "App/Core/errors/error.interface";
import { PromiseEither, left, right } from "App/Core/shared";
import { Genders, ISponsor, IUserClient, ProfWithAccess } from "App/Types/IClient";
import { IFormAnswer } from "App/Types/IFormAnswer";
import { Generic } from "App/Types/ITransaction";
import { UnitNotFoundError } from "../../errors";
import { Entity } from "../abstract/entity.abstract";
import { ClientNotSponsorError } from "../errors/client-not-sponsor";
import { calcAge } from "../helpers/calc-age";
import BirthDate from "../validations/birth-date";
import Document from "../validations/document";
import Email from "../validations/email";
import Name from "../validations/name";
import Sponsor from "../validations/sponsor";
import validationClient from "./validations-client";

/**
 * Representa um cliente no sistema.
 */
export class ClientEntity extends Entity implements IUserClient {
	name: string;
	avatar?: string;
	form_answers: IFormAnswer[];
	profs_with_access: ProfWithAccess[];
	birth_date: Date;
	gender?: Genders;
	document: string;
	rg?: string;
	celphone: string;
	underaged?: boolean;
	sponsor?: ISponsor;
	phone?: string;
	naturalness?: string;
	nationality?: string;
	profession?: string;
	observation?: string;
	sms_checked?: boolean;
	mail_checked?: boolean;
	email: string;
	unity_id: string;
	active?: boolean;
	partner?: string | null;
	due_date?: Date;
	cep?: string;
	street?: string;
	address_number?: string;
	complement?: string;
	neighborhood?: string;
	city?: string;
	state?: string;
	country?: string;


	/**
	 * Construtor privado da classe.
	 */
	private constructor() {
		super();
	}

	get age(): number {
		return calcAge(this.birth_date);
	}

	/**
	 * Define o nome do cliente.
	 * @param name Nome do cliente.
	 * @returns Instância da classe Client.
	 */
	defineName(name: string): this {
		this.name = Name.build(name).value;
		return this;
	}

	/**
	 * Define o avatar do cliente.
	 * @param avatar Avatar do cliente.
	 * @returns Instância da classe Client.
	 */
	defineAvatar(avatar?: string): this {
		this.avatar = avatar;
		return this;
	}

	/**
	 * Define as respostas do formulário do cliente.
	 * @param form_answers Respostas do formulário do cliente.
	 * @returns Instância da classe Client.
	 */
	defineFormAnswers(form_answers: IFormAnswer[] = []): this {
		this.form_answers = form_answers;
		return this;
	}

	/**
	 * Define os profissionais com acesso ao cliente.
	 * @param profs_with_access Profissionais com acesso ao cliente.
	 * @returns Instância da classe Client.
	 */
	defineProfsWithAccess(profs_with_access: ProfWithAccess[] = []): this {
		this.profs_with_access = profs_with_access;
		return this;
	}

	/**
	 * Define a data de nascimento do cliente.
	 * @param birth_date Data de nascimento do cliente.
	 * @returns Instância da classe Client.
	 */
	defineBirthDate(birth_date: string | Date): this {
		this.birth_date = BirthDate.build(birth_date).value;
		return this;
	}

	/**
	 * Define o gênero do cliente.
	 * @param gender Gênero do cliente.
	 * @returns Instância da classe Client.
	 */
	defineGender(gender: Genders = Genders.not_informed): this {
		this.gender = gender;
		return this;
	}

	/**
	 * Define o documento do cliente.
	 * @param document Documento do cliente.
	 * @returns Instância da classe Client.
	 */
	defineDocument(document?: string): this {
		if (!document) return this;

		this.document = Document.build(document).value;
		return this;
	}

	/**
	 * Define o RG do cliente.
	 * @param rg RG do cliente.
	 * @returns Instância da classe Client.
	 */
	defineRg(rg?: string): this {
		this.rg = rg;
		return this;
	}

	/**
	 * Define o número de celular do cliente.
	 * @param celphone Número de celular do cliente.
	 * @returns Instância da classe Client.
	 */
	defineCelphone(celphone: string): this {
		this.celphone = celphone?.replace(/\D/g, '');
		return this;
	}

	/**
	 * Define se o cliente é menor de idade.
	 * @param underaged Indica se o cliente é menor de idade.
	 * @returns Instância da classe Client.
	 */
	defineUnderaged(sponsor?: ISponsor): this {
		// calculate age
		this.underaged = this.age <= 18;
		return this.defineSponsor(sponsor || this.sponsor);
	}

	/**
	 * Define o responsável do cliente.
	 * @param sponsor Responsável do cliente.
	 * @returns Instância da classe Client.
	 * @throws {ClientNotSponsorError} Se o cliente for menor de idade e não tiver patrocinador.
	 */
	defineSponsor(sponsor?: ISponsor): this {
		if (this.underaged && !sponsor) {
			throw new ClientNotSponsorError();
		}

		if (!sponsor) {
			return this;
		}

		this.sponsor = Sponsor.build(sponsor, this.underaged as boolean).value;
		return this;
	}

	/**
	 * Define o número de telefone do cliente.
	 * @param phone Número de telefone do cliente.
	 * @returns Instância da classe Client.
	 */
	definePhone(phone?: string): this {
		this.phone = phone;
		return this;
	}

	/**
	 * Define a naturalidade do cliente.
	 * @param naturalness Naturalidade do cliente.
	 * @returns Instância da classe Client.
	 */
	defineNaturalness(naturalness?: string): this {
		this.naturalness = naturalness;
		return this;
	}

	/**
	 * Define a nacionalidade do cliente.
	 * @param nationality Nacionalidade do cliente.
	 * @returns Instância da classe Client.
	 */
	defineNationality(nationality?: string): this {
		this.nationality = nationality;
		return this;
	}

	/**
	 * Define a profissão do cliente.
	 * @param profession Profissão do cliente.
	 * @returns Instância da classe Client.
	 */
	defineProfession(profession?: string): this {
		this.profession = profession;
		return this;
	}

	/**
	 * Define a observação do cliente.
	 * @param observation Observação do cliente.
	 * @returns Instância da classe Client.
	 */
	defineObservation(observation?: string): this {
		this.observation = observation;
		return this;
	}

	/**
	 * Define se o cliente aceitou receber SMS.
	 * @param sms_checked Indica se o cliente aceitou receber SMS.
	 * @returns Instância da classe Client.
	 */
	defineSmsChecked(sms_checked: boolean = false): this {
		this.sms_checked = sms_checked;
		return this;
	}

	/**
	 * Define se o cliente aceitou receber e-mails.
	 * @param mail_checked Indica se o cliente aceitou receber e-mails.
	 * @returns Instância da classe Client.
	 */
	defineMailChecked(mail_checked: boolean = false): this {
		this.mail_checked = mail_checked;
		return this;
	}

	/**
	 * Define o e-mail do cliente.
	 * @param email E-mail do cliente.
	 * @returns Instância da classe Client.
	 */
	defineEmail(email?: string): this {
		if (!email) return this;
		this.email = Email.build(email).value;
		return this;
	}

	/**
	 * Define o ID da unidade do cliente.
	 * @param unity_id ID da unidade do cliente.
	 * @returns Instância da classe Client.
	 */
	defineUnityId(unity_id: string): this {
		if (!unity_id && !this._id) throw new UnitNotFoundError();

		this.unity_id = unity_id;
		return this;
	}

	/**
	 * Define se o cliente está ativo.
	 * @param active Indica se o cliente está ativo.
	 * @returns Instância da classe Client.
	 */
	defineActive(active: boolean = true): this {
		this.active = active;
		return this;
	}

	/**
	 * Define o parceiro do cliente.
	 * @param partner Parceiro do cliente.
	 * @returns Instância da classe Client.
	 */
	definePartner(partner: Generic | string | null = null): this {
		if (typeof partner === "object") {
			partner = partner?.value?.toString() || null;
		}

		this.partner = partner;
		return this;
	}

	/**
	 * Define a data de vencimento do cliente.
	 * @param due_date Data de vencimento do cliente.
	 * @returns Instância da classe Client.
	 */
	defineDueDate(due_date?: Date): this {
		this.due_date = due_date;
		return this;
	}

	/**
	 * Define o CEP do cliente.
	 * @param cep CEP do cliente.
	 * @returns Instância da classe Client.
	 */
	defineCep(cep?: string): this {
		this.cep = cep;
		return this;
	}

	/**
	 * Define a rua do cliente.
	 * @param street Rua do cliente.
	 * @returns Instância da classe Client.
	 */
	defineStreet(street?: string): this {
		this.street = street;
		return this;
	}

	/**
	 * Define o número do endereço do cliente.
	 * @param address_number Número do endereço do cliente.
	 * @returns Instância da classe Client.
	 */
	defineAddressNumber(address_number?: string): this {
		this.address_number = address_number;
		return this;
	}

	/**
	 * Define o complemento do endereço do cliente.
	 * @param complement Complemento do endereço do cliente.
	 * @returns Instância da classe Client.
	 */
	defineComplement(complement?: string): this {
		this.complement = complement;
		return this;
	}

	/**
	 * Define o bairro do cliente.
	 * @param neighborhood Bairro do cliente.
	 * @returns Instância da classe Client.
	 */
	defineNeighborhood(neighborhood?: string): this {
		this.neighborhood = neighborhood;
		return this;
	}

	/**
	 * Define a cidade do cliente.
	 * @param city Cidade do cliente.
	 * @returns Instância da classe Client.
	 */
	defineCity(city?: string): this {
		this.city = city;
		return this;
	}

	/**
	 * Define o estado do cliente.
	 * @param state Estado do cliente.
	 * @returns Instância da classe Client.
	 */
	defineState(state?: string): this {
		this.state = state;
		return this;
	}

	/**
	 * Define o país do cliente.
	 * @param country País do cliente.
	 * @returns Instância da classe Client.
	 */
	defineCountry(country: string = "BR"): this {
		this.country = country;
		return this;
	}

	/**
	 * Cria uma instância da classe Client a partir dos dados fornecidos.
	 * @param data Dados do cliente.
	 * @returns Promise contendo a instância da classe Client ou um erro.
	 */
	static async build(data: IUserClient): PromiseEither<AbstractError, ClientEntity> {
		try {
			const client = new ClientEntity()
				.defineId(data._id)
				.defineName(data.name)
				.defineActive(data.active)
				.defineAvatar(data.avatar)
				.defineBirthDate(data.birth_date)
				.defineCelphone(data.celphone)
				.defineCity(data.city)
				.defineComplement(data.complement)
				.defineCountry(data.country)
				.defineDocument(data.document)
				.defineDueDate(data.due_date)
				.defineEmail(data.email)
				.defineFormAnswers(data.form_answers)
				.defineCreatedAt(data.created_at)
				.defineGender(data.gender)
				.defineMailChecked(data.mail_checked)
				.defineNationality(data.nationality)
				.defineNaturalness(data.naturalness)
				.defineNeighborhood(data.neighborhood)
				.defineObservation(data.observation)
				.definePartner(data.partner || null)
				.definePhone(data.phone)
				.defineProfession(data.profession)
				.defineProfsWithAccess(data.profs_with_access)
				.defineRg(data.rg)
				.defineSmsChecked(data.sms_checked)
				.defineSponsor(data.sponsor)
				.defineState(data.state)
				.defineStreet(data.street)
				.defineUnderaged(data.sponsor)
				.defineUnityId(data.unity_id?.toString() as string)
				.defineAddressNumber(data.address_number)
				.defineCep(data.cep);

			validationClient().parse(client);

			return right(client);
		} catch (error) {


			return left(error);
		}
	}
}
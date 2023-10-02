import { ISponsor } from 'App/Types/IClient'
import { z } from 'zod'
import { Validate } from '../abstract/validate.abstract'
import { ClientNotSponsorError } from '../errors/client-not-sponsor'

class Sponsor extends Validate<ISponsor> {
	private constructor(sponsor: ISponsor, underaged: boolean) {
		super(sponsor)
		this.validate(underaged)
	}

	public validate(underaged: boolean): this {
		const sponsorSchema = z.object({
			name: z.string().nonempty(),
			phone: z.string().nonempty(),
		})
		const { success } = sponsorSchema.safeParse(this.value)

		if (!success && underaged) {
			throw new ClientNotSponsorError()
		}

		return this
	}

	public static build(sponsor: ISponsor, underaged: boolean): Sponsor {
		return new Sponsor(sponsor, underaged)
	}
}

export default Sponsor

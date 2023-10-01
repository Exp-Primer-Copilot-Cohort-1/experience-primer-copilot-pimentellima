import { ISponsor } from 'App/Types/IClient'
import { z } from 'zod'
import { Validate } from '../abstract/validate.abstract'

class Sponsor extends Validate<ISponsor> {
	private constructor(sponsor: ISponsor) {
		super(sponsor)
		this.validate()
	}

	public validate(): this {
		const sponsorSchema = z.object({
			name: z.string().nonempty(),
			phone: z.string().nonempty(),
		})
		sponsorSchema.parse(this.value)
		return this
	}

	public static build(sponsor: ISponsor): Sponsor {
		return new Sponsor(sponsor)
	}
}

export default Sponsor

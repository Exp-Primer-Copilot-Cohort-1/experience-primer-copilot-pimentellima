import { faker } from "@faker-js/faker";
import { AppointmentStatus } from "App/Helpers";

export const makeValidActivity = () => {
	const date = faker.date.future();
    date.setHours(0);
    const hour_start = new Date(date)
    hour_start.setHours(3);
    const hour_end = new Date(date)
    hour_end.setHours(hour_start.getHours() + 1);
    const validActivity = {
        _id: faker.random.numeric(),
        date,
        hour_start,
        hour_end,
        status: AppointmentStatus.SCHEDULED,
        schedule_block: false,
        procedures: [
            {
                value: "6359965bc109b232759921e3",
                label: "SESSÃO FISIOTERAPIA ",
                minutes: 60,
                color: "#b452e7",
                val: 160,
                health_insurance: {
                    value: "63597974c109b232759921dc",
                    label: "PARTICULAR",
                    price: 160,
                },
                status: "PAGO",
            },
        ],
        client: {
            value: "6399e196373d349c09b46dba",
            label: "TESTE",
            celphone: "(31) 9 9937-9196",
            email: "TESTE",
            partner: null,
        },
        obs: null,
        prof: {
            value: "635978cec109b232759921da",
            label: "TESTE",
        },
        phone: null,
        all_day: false,
        is_recorrent: false,
        active: true,
        unity_id: "63528c11c109b232759921d1",
        user_id: "635978cec109b232759921da",
        scheduled: "scheduled",
        prof_id: "635978cec109b232759921da",
    };
    return validActivity;
}
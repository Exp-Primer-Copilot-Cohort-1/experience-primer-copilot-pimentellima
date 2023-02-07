'use strict';

const mongoose = require('mongoose');

const SELECTS = require('../../SelectsQuery/user-select');

const User = use('App/Models/User');

class ClientControllerV2 {
    async verifyExistenceClient({ request, auth, response }) {
        const { name, birth_date } = request.all();
        const { unity_id } = auth.user;
        if (!name || !birth_date) {
            return response.status(400).json({
                message: 'Missing Name Or Birth Day',
            });
        }

        const user = await User.where({
            name,
            birth_date,
            unity_id,
        })
            .select(SELECTS)
            .first();

        if (!user) {
            return response.status(404).json({
                message: 'User Not Found',
            });
        }

        return user
    }

    async create({ request, auth, response }) {
        const data = request.all();
        const { unity_id } = auth.user;

        const {
            name, birth_date, email, celphone
        } = data;

        if (!name || !birth_date || !email || !celphone) {
            return response.status(400).json({
                message: 'Missing Name Or Birth Day Or Email Or CellPhone',
            });
        }

        const userData = await User.where({
            email,
            name,
            birth_date,
            unity_id,
        }).first();

        if (userData?.active) {
            return response.status(400).send({
                error: {
                    message: 'Este cliente já está cadastrado na unidade.',
                },
            });
        }

        const user = await User.create({
            ...data,
            unity_id: mongoose.Types.ObjectId(unity_id),
            active: true,
            due_date: null,
            email: data.email?.trim().toLowerCase() || '',
        });

        return user;
    }
}

module.exports = ClientControllerV2;

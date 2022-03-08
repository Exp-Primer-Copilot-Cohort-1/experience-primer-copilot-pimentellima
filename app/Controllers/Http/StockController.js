/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable consistent-return */

'use strict';

const mongoose = require('mongoose');

const Stock = use('App/Models/Stock');
const Stockslog = use('App/Models/Stockslog');

const _ = require('lodash');

function customIsEquals(first, second) {
  const val = [];
  _.forEach(second, (value, key) => {
    if (first[key] !== value) {
      val.push({ value, key });
    }
  });
  return val;
}

class StockController {
  async index({ request, auth }) {
    const userLogged = auth.user;
    try {
      const data = request.only(['name']);
      if (data.name) {
        const stocks = Stock.where({
          name: { $regex: new RegExp(`.*${data.name}.*`) },
          unity_id: userLogged.unity_id,
        })
          .sort('-name')
          .with('stocklog')
          .fetch();
        return stocks;
      }
      const stocks = Stock.where({
        unity_id: userLogged.unity_id,
      })
        .with('stocklog')
        .fetch();
      return stocks;
    } catch (err) {
      console.log(err);
    }
  }

  async store({ request, auth }) {
    const userLogged = auth.user;
    const data = request.only(['name', 'price_cost', 'price_final', 'quantity',
      'quantity_add', 'date_batch', 'batch', 'stock_automatic', 'quantity_minimun']);

    const stocks = await Stock.create({
      ...data,
      active: true,
      quantity: data.quantity_add,
      unity_id: mongoose.Types.ObjectId(userLogged.unity_id),
    });

    const obj = {
      title: `Novo produto: ${data.description}`,
    };
    await Stockslog.create({
      ...obj,
      stocks_id: mongoose.Types.ObjectId(stocks._id),
      admin: userLogged.toJSON(),
    });

    return stocks;
  }

  async updateLot({ params, request, auth }) {
    const userLogged = auth.user;
    const stocks = await Stock.where({ _id: params.id }).first();
    if (stocks) {
      const data = request.only(['date_batch', 'quantity_add']);
      if (data.quantity_add) {
        if (parseInt(stocks.quantity, 10) + parseInt(data.quantity_add, 10) < 0) {
          return response.status(400).send({
            error: {
              message: 'Quantidade de itens em estoque insuficiente.',
            },
          });
        }
        const quantity = parseInt(stocks.quantity, 10) + parseInt(data.quantity_add, 10);
        delete data.quantity_add;
        stocks.merge({...data, quantity});
        await stocks.save();
        const dataArr = customIsEquals(stocks.toJSON(), data);
        for (const dt of dataArr) {
          let title = '';
          if (dt.key === 'quantity_add') {
            title = 'Adicionar estoque';
          }
          if (dt.key === 'date_batch') {
            title = 'Data de vencimento';
          }
          const obj = {
            title,
            before: stocks[dt.key],
            after: data[dt.key],
          };
          await Stockslog.create({
            ...obj,
            stocks_id: mongoose.Types.ObjectId(stocks._id),
            admin: userLogged.toJSON(),
          });
        }
        return stocks;
      }
      const dataArr = customIsEquals(stocks.toJSON(), data);
      for (const dt of dataArr) {
        let title = '';
        if (dt.key === 'quantity_add') {
          title = 'Adicionar estoque';
        }
        if (dt.key === 'date_batch') {
          title = 'Data de vencimento';
        }
        const obj = {
          title,
          before: stocks[dt.key],
          after: data[dt.key],
        };
        await Stockslog.create({
          ...obj,
          stocks_id: mongoose.Types.ObjectId(stocks._id),
          admin: userLogged.toJSON(),
        });
      }

      stocks.merge({...data});
      await stocks.save();
      return stocks;
    }
  }

  async update({ params, request, auth }) {
    const userLogged = auth.user;
    const stocks = await Stock.where({ _id: params.id }).first();
    if (stocks) {
      const data = request.only(['active', 'quantity_minimun',
        'name', 'price_cost', 'price_final',
        'quantity', 'quantity_add', 'date_batch',
        'batch', 'stock_automatic']);
      let quantityAdd;
      if (data.stock_automatic) {
        if (parseInt(stocks.quantity, 10) + parseInt(data.quantity_add, 10) >= 0) {
          const quantity = parseInt(stocks.quantity, 10) + parseInt(data.quantity_add, 10);
          quantityAdd = data.quantity_add;
          delete data.quantity_add;
          stocks.merge({...data, quantity});
          await stocks.save();
          const dataArr = customIsEquals(stocks.toJSON(), data);
          for (const dt of dataArr) {
            let title = '';
            if (dt.key === 'stock_automatic') {
              title = 'Dar baixa em estoque?';
            }
            if (dt.key === 'date_batch') {
              title = 'Data de vencimento';
            }
            if (dt.key === 'batch') {
              title = 'Lote';
            }
            if (dt.key === 'active') {
              title = 'Ativo';
            }
            if (dt.key === 'name') {
              title = 'Nome';
            }
            if (dt.key === 'price_cost') {
              title = 'Preço de custo';
            }
            if (dt.key === 'price_final') {
              title = 'Preço final';
            }
            if (quantityAdd && quantityAdd !== 0) {
              title = 'Quantidade';
            }
            if (dt.key === 'quantity_minimun') {
              title = 'Quantidade minima';
            }
            const obj = {
              title,
              after: stocks[dt.key],
              before: data[dt.key],
            };
            await Stockslog.create({
              ...obj,
              stocks_id: mongoose.Types.ObjectId(stocks._id),
              admin: userLogged.toJSON(),
            });
          }
          return stocks;
        }

        return response.status(400).send({
          error: {
            message: 'Quantidade de itens em estoque insuficiente.',
          },
        });
      }
      const dataArr = customIsEquals(stocks.toJSON(), data);
      for (const dt of dataArr) {
        let title = '';
        if (dt.key === 'stock_automatic') {
          title = 'Dar baixa em estoque?';
        }
        if (dt.key === 'date_batch') {
          title = 'Data de vencimento';
        }
        if (dt.key === 'batch') {
          title = 'Lote';
        }
        if (dt.key === 'active') {
          title = 'Ativo';
        }
        if (dt.key === 'name') {
          title = 'Nome';
        }
        if (dt.key === 'price_cost') {
          title = 'Preço de custo';
        }
        if (dt.key === 'price_final') {
          title = 'Preço final';
        }
        if (quantityAdd && quantityAdd !== 0) {
          title = 'Quantidade';
        }
        if (dt.key === 'quantity_minimun') {
          title = 'Quantidade minima';
        }
        const obj = {
          title,
          after: stocks[dt.key],
          before: data[dt.key],
        };
        await Stockslog.create({
          ...obj,
          stocks_id: mongoose.Types.ObjectId(stocks._id),
          admin: userLogged.toJSON(),
        });
      }

      stocks.merge({...data});
      await stocks.save();
      return stocks;
    }
  }

  async show({ params }) {
    const stocks = await Stock.where({ _id: params.id }).with('stocklog')
      .firstOrFail();

    return stocks;
  }

  async destroy({ params }) {
    const stocks = await Stock.where({ _id: params.id }).firstOrFail();
    await stocks.delete();
  }
}

module.exports = StockController;

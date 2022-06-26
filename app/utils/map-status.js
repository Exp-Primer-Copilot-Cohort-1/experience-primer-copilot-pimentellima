/* eslint-disable no-underscore-dangle */
class MapStatus {
  constructor(key) {
    this._title = 'scheduled';

    if (key === '') {
      this._title = 'Agendado';
    }
    if (key === 'finished_at') {
      this._title = 'Finalizado às';
    }
    if (key === 'started_at') {
      this._title = 'Iniciado às';
    }
    if (key === 'all_day') {
      this._title = 'Atividade o dia completo';
    }
    if (key === 'partner') {
      this._title = 'Parceiro';
    }
    if (key === 'phone') {
      this._title = 'Telefone';
    }
    if (key === 'obs') {
      this._title = 'Observação';
    }
    if (key === 'prof') {
      this._title = 'Profissional';
    }
    if (key === 'client') {
      this._title = 'Cliente';
    }
    if (key === 'procedures') {
      this._title = 'Procedimentos';
    }
    if (key === 'active') {
      this._title = 'Ativo';
    }
    if (key === 'date') {
      this._title = 'Data';
    }
    if (key === 'hour_start') {
      this._title = 'Hora de inicio';
    }
    if (key === 'hour_end') {
      this._title = 'Hora final';
    }
    if (key === 'description') {
      this._title = 'Descrição';
    }
    if (key === 'status') {
      this._title = 'Status';
    }
    if (key === 'schedule_block') {
      this._title = 'Bloquear agendamento';
    }
    if (key === 'schedule') {
      this._title = 'Agendar';
    }
  }

  get title() {
    return this._title;
  }
}

module.exports = MapStatus;

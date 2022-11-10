/* eslint-disable no-underscore-dangle */
class PermissionEntity {
  params() {
    return { ...this };
  }

  defineAllPermissionByTrue() {
    Object.keys(this).forEach((key) => {
      this[key] = true;
    });
    return this;
  }

  defineAllPermissionByFalse() {
    Object.keys(this).forEach((key) => {
      this[key] = false;
    });
    return this;
  }

  definePermissionAdminActivity(permission) {
    this.admin_activity = permission;
    return this;
  }

  definePermissionAdminProfActivity(permission) {
    this.admin_prof_activity = permission;
    return this;
  }

  definePermissionProfActivity(permission) {
    this.prof_activity = permission;
    return this;
  }

  definePermissionSecActivity(permission) {
    this.sec_activity = permission;
    return this;
  }

  definePermissionAdminActivityAwait(permission) {
    this.admin_activity_await = permission;
    return this;
  }

  definePermissionAdminProfActivityAwait(permission) {
    this.admin_prof_activity_await = permission;
    return this;
  }

  definePermissionProfActivityAwait(permission) {
    this.prof_activity_await = permission;
    return this;
  }

  definePermissionSecActivityAwait(permission) {
    this.sec_activity_await = permission;
    return this;
  }

  definePermissionAdminAnswers(permission) {
    this.admin_answers = permission;
    return this;
  }

  definePermissionAdminProfAnswers(permission) {
    this.admin_prof_answers = permission;
    return this;
  }

  definePermissionProfAnswers(permission) {
    this.prof_answers = permission;
    return this;
  }

  definePermissionSecAnswers(permission) {
    this.sec_answers = permission;
    return this;
  }

  definePermissionAdminAnswersHistoric(permission) {
    this.admin_answers_historic = permission;
    return this;
  }

  definePermissionAdminProfAnswersHistoric(permission) {
    this.admin_prof_answers_historic = permission;
    return this;
  }

  definePermissionProfAnswersHistoric(permission) {
    this.prof_answers_historic = permission;
    return this;
  }

  definePermissionSecAnswersHistoric(permission) {
    this.sec_answers_historic = permission;
    return this;
  }

  definePermissionAdminClients(permission) {
    this.admin_clients = permission;
    return this;
  }

  definePermissionAdminProfClients(permission) {
    this.admin_prof_clients = permission;
    return this;
  }

  definePermissionProfClients(permission) {
    this.prof_clients = permission;
    return this;
  }

  definePermissionSecClients(permission) {
    this.sec_clients = permission;
    return this;
  }

  definePermissionAdminCompany(permission) {
    this.admin_company = permission;
    return this;
  }

  definePermissionAdminProfCompany(permission) {
    this.admin_prof_company = permission;
    return this;
  }

  definePermissionProfCompany(permission) {
    this.prof_company = permission;
    return this;
  }

  definePermissionSecCompany(permission) {
    this.sec_company = permission;
    return this;
  }

  definePermissionAdminForm(permission) {
    this.admin_form = permission;
    return this;
  }

  definePermissionAdminProfForm(permission) {
    this.admin_prof_form = permission;
    return this;
  }

  definePermissionProfForm(permission) {
    this.prof_form = permission;
    return this;
  }

  definePermissionSecForm(permission) {
    this.sec_form = permission;
    return this;
  }

  definePermissionAdminFormHistoric(permission) {
    this.admin_form_historic = permission;
    return this;
  }

  definePermissionAdminProfFormHistoric(permission) {
    this.admin_prof_form_historic = permission;
    return this;
  }

  definePermissionProfFormHistoric(permission) {
    this.prof_form_historic = permission;
    return this;
  }

  definePermissionSecFormHistoric(permission) {
    this.sec_form_historic = permission;
    return this;
  }

  definePermissionAdminClientsList(permission) {
    this.admin_clients_list = permission;
    return this;
  }

  definePermissionAdminProfClientsList(permission) {
    this.admin_prof_clients_list = permission;
    return this;
  }

  definePermissionProfClientsList(permission) {
    this.prof_clients_list = permission;
    return this;
  }

  definePermissionSecClientsList(permission) {
    this.sec_clients_list = permission;
    return this;
  }

  definePermissionAdminProfList(permission) {
    this.admin_prof_list = permission;
    return this;
  }

  definePermissionAdminProfProfList(permission) {
    this.admin_prof_prof_list = permission;
    return this;
  }

  definePermissionProfProfList(permission) {
    this.prof_prof_list = permission;
    return this;
  }

  definePermissionSecProfList(permission) {
    this.sec_prof_list = permission;
    return this;
  }

  definePermissionAdminSecList(permission) {
    this.admin_sec_list = permission;
    return this;
  }

  definePermissionAdminProfSecList(permission) {
    this.admin_prof_sec_list = permission;
    return this;
  }

  definePermissionProfSecList(permission) {
    this.prof_sec_list = permission;
    return this;
  }

  definePermissionSecSecList(permission) {
    this.sec_sec_list = permission;
    return this;
  }

  definePermissionAdminMyActivities(permission) {
    this.admin_my_activities = permission;
    return this;
  }

  definePermissionAdminProfMyActivities(permission) {
    this.admin_prof_my_activities = permission;
    return this;
  }

  definePermissionProfMyActivities(permission) {
    this.prof_my_activities = permission;
    return this;
  }

  definePermissionSecMyActivities(permission) {
    this.sec_my_activities = permission;
    return this;
  }

  definePermissionAdminPartner(permission) {
    this.admin_partner = permission;
    return this;
  }

  definePermissionAdminProfPartner(permission) {
    this.admin_prof_partner = permission;
    return this;
  }

  definePermissionProfPartner(permission) {
    this.prof_partner = permission;
    return this;
  }

  definePermissionSecPartner(permission) {
    this.sec_partner = permission;
    return this;
  }

  definePermissionAdminPartnerCreate(permission) {
    this.admin_partner_create = permission;
    return this;
  }

  definePermissionAdminProfPartnerCreate(permission) {
    this.admin_prof_partner_create = permission;
    return this;
  }

  definePermissionProfPartnerCreate(permission) {
    this.prof_partner_create = permission;
    return this;
  }

  definePermissionSecPartnerCreate(permission) {
    this.sec_partner_create = permission;
    return this;
  }

  definePermissionAdmin_(permission) {
    this.admin_ = permission;
    return this;
  }

  defineAdminProf(permission) {
    this.admin_prof_ = permission;
    return this;
  }

  definePermissionProf(permission) {
    this.prof_ = permission;
    return this;
  }

  definePermissionSec(permission) {
    this.sec_ = permission;
    return this;
  }

  definePermissionAdminProcedures(permission) {
    this.admin_procedures = permission;
    return this;
  }

  definePermissionAdminProfProcedures(permission) {
    this.admin_prof_procedures = permission;
    return this;
  }

  definePermissionProfProcedures(permission) {
    this.prof_procedures = permission;
    return this;
  }

  definePermissionSecProcedures(permission) {
    this.sec_procedures = permission;
    return this;
  }

  definePermissionAdminProceduresCreate(permission) {
    this.admin_procedures_create = permission;
    return this;
  }

  definePermissionAdminProfProceduresCreate(permission) {
    this.admin_prof_procedures_create = permission;
    return this;
  }

  definePermissionProfProceduresCreate(permission) {
    this.prof_procedures_create = permission;
    return this;
  }

  definePermissionSecProceduresCreate(permission) {
    this.sec_procedures_create = permission;
    return this;
  }

  definePermissionAdminSchedule(permission) {
    this.admin_schedule = permission;
    return this;
  }

  definePermissionAdminProfSchedule(permission) {
    this.admin_prof_schedule = permission;
    return this;
  }

  definePermissionProfSchedule(permission) {
    this.prof_schedule = permission;
    return this;
  }

  definePermissionSecSchedule(permission) {
    this.sec_schedule = permission;
    return this;
  }

  definePermissionAdminCategory(permission) {
    this.admin_category = permission;
    return this;
  }

  definePermissionAdminProfCategory(permission) {
    this.admin_prof_category = permission;
    return this;
  }

  definePermissionProfCategory(permission) {
    this.prof_category = permission;
    return this;
  }

  definePermissionSecCategory(permission) {
    this.sec_category = permission;
    return this;
  }
}

module.exports = PermissionEntity;

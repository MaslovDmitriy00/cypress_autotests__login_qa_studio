import * as data from "../helpers/default_data.json"
import * as main_page from "../locators/main_page.json"
import * as recovery_password_page from "../locators/recovery_password_page.json"
import * as result_page from "../locators/result_page.json"

describe('Проверка авторизации', function () {

    this.beforeEach('Начало теста', function () {
        cy.visit('/');
        cy.get(main_page.forgot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)');
    });

    this.afterEach('Конец теста', function() {
        cy.get(result_page.close).should('be.visible');
    })

    it('1. Позитивный кейс авторизации: Верный логин и пароль', function () {
         cy.get(main_page.email).type(data.login);
         cy.get(main_page.password).type(data.password);
         cy.get(main_page.login_button).click();

         cy.wait(1000);  // не обязательно, просто + разный функционал из лекции

         cy.get(result_page.title).contains("Авторизация прошла успешно").should('be.visible');
     })

     it('2. Проверка логики восстановления пароля', function () {
        cy.get(main_page.forgot_pass_btn).click();
       
        cy.get(recovery_password_page.title).should('be.visible').contains("Восстановите пароль");
        cy.get(recovery_password_page.email).type(data.login);
        cy.get(recovery_password_page.send_button).click();
        cy.get(result_page.title).contains("Успешно отправили пароль на e-mail").should('be.visible');
    })

     it('3. Негативный кейс авторизации: Верный логин, но НЕверный пароль', function () {
        cy.get(main_page.email).type(data.login);
        cy.get(main_page.password).type('iLoveqastudio7');
        cy.get(main_page.login_button).click();
        cy.get(result_page.title).contains("Такого логина или пароля нет").should('be.visible');
    })

    it('4. Негативный кейс авторизации: Неверный логин, но верный пароль', function () {
        cy.get(main_page.email).type('german_dolnikov@dolnikov.ru');
        cy.get(main_page.password).type(data.password);
        cy.get(main_page.login_button).click();
        cy.get(result_page.title).contains("Такого логина или пароля нет").should('be.visible');
    })


    it('5. Негативный кейс валидации: В логине нет @, но верный пароль', function () {
        cy.get(main_page.email).type('germandolnikov.ru');
        cy.get(main_page.password).type(data.password);
        cy.get(main_page.login_button).click();
        cy.get(result_page.title).contains("Нужно исправить проблему валидации").should('be.visible');
    })

    it('6. Позитивный кейс авторизации: Логин имеет заглавные буквы, должен приводится к строчным буквам', function () {
        cy.get(main_page.email).type('GerMan@Dolnikov.ru');
        cy.get(main_page.password).type(data.password);
        cy.get(main_page.login_button).click();
        cy.get(result_page.title).contains("Авторизация прошла успешно").should('be.visible');
    })
    
 }) 
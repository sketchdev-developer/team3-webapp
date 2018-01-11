import {SpecHelper} from './support/spec.helper';
import {SignupPage} from './pages/signup.po';
import {DashboardPage} from './pages/dashboard.po';

describe('signing up', () => {
	let specHelper: SpecHelper;
	let signupPage: SignupPage;
	let dashboardPage: DashboardPage;

	let email: string;
	let password: string;
	let preferredBeverage: string;

	beforeEach(() => {
		specHelper = new SpecHelper();
		signupPage = new SignupPage();
		dashboardPage = new DashboardPage();
	});

	describe('valid credentials', () => {
		beforeEach(() => {
			email = 'valid@example.com';
			password = 'ValidPassword123!';
			preferredBeverage = 'Bourbon';

			specHelper.stubApiRequest({
				url: '/users',
				method: 'POST',
				response: {
					code: 201,
					data: {
						token: 'something',
						user: {
							id: 100,
							email: email,
							preferredBeverage: preferredBeverage
						}
					}
				}
			});
		});

		it('redirects to protected page', () => {
			specHelper.navigateTo(signupPage);

			signupPage.emailInput.sendKeys(email);
			signupPage.passwordInput.sendKeys(password);
			signupPage.selBeverage.sendKeys(preferredBeverage);

			signupPage.signupButton.click();

			expect(dashboardPage.header.getText()).toEqual('Dashboard');
			expect(dashboardPage.welcome.getText()).toEqual('You like ' + preferredBeverage);
			expect(specHelper.getCurrentUrl()).toEqual('/dashboard');
		});
	});

	describe('invalid credentials', () => {
		beforeEach(() => {
			email = 'existing_user@example.com';
			password = 'somePassword!';

			specHelper.stubApiRequest({
				url: '/users',
				method: 'POST',
				response: {
					code: 422,
					data: {
						errors: 'Email already in use'
					}
				}
			});
		});

		it('shows error on signup page', () => {
			specHelper.navigateTo(signupPage);

			signupPage.emailInput.sendKeys(email);
			signupPage.passwordInput.sendKeys(password);

			signupPage.signupButton.click();

			expect(signupPage.errorMessages.getText()).toEqual('Email already in use');
		});
	});


});

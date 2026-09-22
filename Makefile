lint:
	npm run lint

deps:
	npm install

test:
	npm run test

test_functional:
	npm run cypress:run

start:
	npm run start

stop:
	npm run stop

outdated:
	npm outdated

audit:
	npm audit

fix:
	npm audit fix

upgrade:
	npm update

publish:
	echo "** npm login if you haven't already **"
	npm whoami
	npm run build:library
	npm publish --access public

release:
	npm install
	bat docs/RELEASE_QUESTIONS.md

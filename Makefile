
start:
	docker compose up

bash:
	docker exec -it laradockweb bash

migrate:
	docker exec laradockweb php artisan migrate

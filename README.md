# Books (Laravel / Vue)
## Building / Running
Here are two methods to build / run the app.
If you don't have macOS you'll have to go the Sail / Docker route.
If you do have macOS, you might find the Valet route to be quicker.

NOTE: I left the .env in the repo to make this slightly quicker... I normally **wouldn't** commit it.

### Sail (i.e. Docker)
1. Clone this repo
2. `cd` into the project and run `composer install --ignore-platform-reqs`
3. Install [Docker Desktop](https://www.docker.com/products/docker-desktop), if you haven't yet
4. Run `vendor/bin/sail up -d`
5. Run `vendor/bin/sail/artisan migrate`
6. Visit http://localhost in your browser of choice
7. When you've seen enough of the site, run `vendor/bin/sail/artisan advise`

### Valet
1. Clone this repo into a directory called "books"
2. Intall [Valet](https://laravel.com/docs/8.x/valet#installation), if you haven't yet
3. `cd` into the project and run `composer install`
4. Create a mysql table called `books`
5. Open up .env and:
   1. comment out the "for sail" section / uncomment the "for valet" section
   2. Change any other `DB_` params needed
6. Run `php artisan migrate`
7. Run `valet link` and visit http://books.test in your browser of choice
8. When you've seen enough of the site, run `php artisan advise`

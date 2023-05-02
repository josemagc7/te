<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;
use Illuminate\Routing\UrlGenerator;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {print_r("a");
        if (env('REDIRECT_HTTPS')) {
            print_r("b");
            $this->app['request']->server->set('HTTPS', true);
        }
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(UrlGenerator $url)
    {
        print_r("1");
        if (env('REDIRECT_HTTPS')) {
            $url->formatScheme('https://');
            print_r("2");    
        }
        Schema::defaultStringLength(191);
    }
}

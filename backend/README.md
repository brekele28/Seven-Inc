<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

# Backend - Seven Inc

Backend API untuk Sistem E-Recruitment Pegawai pada Website Company Profile Seven Inc menggunakan Laravel 12.

## Requirements

* PHP 8.2+
* Composer
* MySQL
* Laravel 12

---

## Installation

Clone repository:

```bash
git clone https://github.com/brekele28/Seven-Inc.git
```

Masuk ke folder backend:

```bash
cd Seven-Inc/backend
```

Install dependency:

```bash
composer install
```

Copy file environment:

```bash
cp .env.example .env
```

---

## Database Configuration

Ubah konfigurasi database pada file `.env`:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=seven_inc_api
DB_USERNAME=root
DB_PASSWORD=
```

---

## Generate Application Key

```bash
php artisan key:generate
```

---

## Run Migration

```bash
php artisan migrate
```

---

## Install JWT Authentication

Install package JWT:

```bash
composer require php-open-source-saver/jwt-auth
```

Publish konfigurasi:

```bash
php artisan vendor:publish --provider="PHPOpenSourceSaver\JWTAuth\Providers\LaravelServiceProvider"
```

Generate JWT Secret:

```bash
php artisan jwt:secret
```

---

## Create Storage Link

Agar file gambar dapat diakses dari public:

```bash
php artisan storage:link
```

---

## Run Development Server

```bash
php artisan serve
```

Server berjalan pada:

```text
http://127.0.0.1:8000
```

---

## Author

Rois Ali Fernanda

Fullstack Developer

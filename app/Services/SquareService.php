<?php

namespace App\Services;

use Square\SquareClient;
use Square\Models\Money;
use Square\Models\CreatePaymentRequest;
use Illuminate\Support\Str;

class SquareService
{
    protected $client;

    public function __construct()
    {
        $this->client = new SquareClient([
            'accessToken' => env('SQUARE_ACCESS_TOKEN'),
            'environment' => env('SQUARE_ENVIRONMENT')
        ]);
    }

    public function createPayment($token, $amount)
    {
        $paymentsApi = $this->client->getPaymentsApi();

        $money = new Money();
        $money->setAmount($amount);
        $money->setCurrency('USD');

        $idempotencyKey = Str::uuid()->toString();
        $createPaymentRequest = new CreatePaymentRequest($token, $idempotencyKey, $money);

        $response = $paymentsApi->createPayment($createPaymentRequest);

        if ($response->isSuccess()) {
            return $response->getResult();
        } else {
            return $response->getErrors();
        }
    }
}

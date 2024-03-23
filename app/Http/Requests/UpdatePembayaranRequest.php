<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class UpdatePembayaranRequest extends FormRequest
{
    /**
     * Determine if the pembayaran is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'penjualan_id' => 'required|numeric',
            'date' => 'required|date',
            'note' => 'nullable|string|max:255',
            'value' => 'required|numeric'
        ];
    }
}

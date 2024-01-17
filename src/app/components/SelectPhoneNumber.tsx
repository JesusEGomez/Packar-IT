import React from 'react';
import CountryCode from './CountryCode';

const SelectPhoneNumber = (props: any) => {
  return (
    <div className='flex flex-col w-full lg:w-full mx-auto lg:flex-row justify-center items-center'>
      <CountryCode onCountryCodeChange={props.onCountryCodeChange} />
      <input
        placeholder='Número de teléfono'
        type="text"  
        className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500 w-1/2 lg:w-full"
        id="number"
        aria-describedby="phoneNumber"
        onChange={(e) => props.onPhoneNumberChange(e.target.value)}
      />
    </div>
  );
};

export default SelectPhoneNumber;

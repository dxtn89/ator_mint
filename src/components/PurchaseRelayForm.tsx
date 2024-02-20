import { useState } from 'react';
import { Icon } from '@iconify/react';
import { twMerge } from 'tailwind-merge';
import { RadioGroup } from '@headlessui/react';

const PurchaseRelayForm = () => {
  const deliveryMethods = [
    {
      id: 1,
      title: 'Standard',
      turnaround: '4–10 business days',
      price: '$5.00',
    },
    {
      id: 2,
      title: 'Express',
      turnaround: '2–5 business days',
      price: '$16.00',
    },
  ];

  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(
    deliveryMethods[0]
  );

  return (
    <div className='bg-gray-800'>
      <div className='mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8'>
        <h2 className='sr-only'>Checkout</h2>

        <form className='lg:grid lg:gap-x-12 xl:gap-x-16'>
          <div>
            <div>
              <h2 className='text-lg font-medium text-gray-300'>
                Contact information
              </h2>

              <div className='mt-4'>
                <label
                  htmlFor='email-address'
                  className='block text-sm font-medium text-gray-200'
                >
                  Email address
                </label>
                <div className='mt-1'>
                  <input
                    type='email'
                    id='email-address'
                    name='email-address'
                    autoComplete='email'
                    className='block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm'
                  />
                </div>
              </div>
            </div>

            <div className='mt-10 border-t border-gray-200 pt-10'>
              <h2 className='text-lg font-medium text-gray-300'>
                Shipping information
              </h2>

              <div className='mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4'>
                <div>
                  <label
                    htmlFor='first-name'
                    className='block text-sm font-medium text-gray-200'
                  >
                    First name
                  </label>
                  <div className='mt-1'>
                    <input
                      type='text'
                      id='first-name'
                      name='first-name'
                      autoComplete='given-name'
                      className='block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm'
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor='last-name'
                    className='block text-sm font-medium text-gray-200'
                  >
                    Last name
                  </label>
                  <div className='mt-1'>
                    <input
                      type='text'
                      id='last-name'
                      name='last-name'
                      autoComplete='family-name'
                      className='block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm'
                    />
                  </div>
                </div>

                <div className='sm:col-span-2'>
                  <label
                    htmlFor='company'
                    className='block text-sm font-medium text-gray-200'
                  >
                    Company
                  </label>
                  <div className='mt-1'>
                    <input
                      type='text'
                      name='company'
                      id='company'
                      className='block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm'
                    />
                  </div>
                </div>

                <div className='sm:col-span-2'>
                  <label
                    htmlFor='address'
                    className='block text-sm font-medium text-gray-200'
                  >
                    Address
                  </label>
                  <div className='mt-1'>
                    <input
                      type='text'
                      name='address'
                      id='address'
                      autoComplete='street-address'
                      className='block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm'
                    />
                  </div>
                </div>

                <div className='sm:col-span-2'>
                  <label
                    htmlFor='apartment'
                    className='block text-sm font-medium text-gray-200'
                  >
                    Apartment, suite, etc.
                  </label>
                  <div className='mt-1'>
                    <input
                      type='text'
                      name='apartment'
                      id='apartment'
                      className='block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm'
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor='city'
                    className='block text-sm font-medium text-gray-200'
                  >
                    City
                  </label>
                  <div className='mt-1'>
                    <input
                      type='text'
                      name='city'
                      id='city'
                      autoComplete='address-level2'
                      className='block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm'
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor='country'
                    className='block text-sm font-medium text-gray-200'
                  >
                    Country
                  </label>
                  <div className='mt-1'>
                    <select
                      id='country'
                      name='country'
                      autoComplete='country-name'
                      className='block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm'
                    >
                      <option>United States</option>
                      <option>Canada</option>
                      <option>Mexico</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor='region'
                    className='block text-sm font-medium text-gray-200'
                  >
                    State / Province
                  </label>
                  <div className='mt-1'>
                    <input
                      type='text'
                      name='region'
                      id='region'
                      autoComplete='address-level1'
                      className='block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm'
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor='postal-code'
                    className='block text-sm font-medium text-gray-200'
                  >
                    Postal code
                  </label>
                  <div className='mt-1'>
                    <input
                      type='text'
                      name='postal-code'
                      id='postal-code'
                      autoComplete='postal-code'
                      className='block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm'
                    />
                  </div>
                </div>

                <div className='sm:col-span-2'>
                  <label
                    htmlFor='phone'
                    className='block text-sm font-medium text-gray-200'
                  >
                    Phone
                  </label>
                  <div className='mt-1'>
                    <input
                      type='text'
                      name='phone'
                      id='phone'
                      autoComplete='tel'
                      className='block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm'
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className='mt-10 border-t border-gray-200 pt-10'>
              <RadioGroup
                value={selectedDeliveryMethod}
                onChange={setSelectedDeliveryMethod}
              >
                <RadioGroup.Label className='text-lg font-medium text-gray-300'>
                  Delivery method
                </RadioGroup.Label>

                <div className='mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4'>
                  {deliveryMethods.map((deliveryMethod) => (
                    <RadioGroup.Option
                      key={deliveryMethod.id}
                      value={deliveryMethod}
                      className={({ checked, active }) =>
                        twMerge(
                          checked ? 'border-transparent' : 'border-gray-300',
                          active ? 'ring-2 ring-cyan-500' : '',
                          'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none'
                        )
                      }
                    >
                      {({ checked, active }) => (
                        <>
                          <span className='flex flex-1'>
                            <span className='flex flex-col'>
                              <RadioGroup.Label
                                as='span'
                                className='block text-sm font-medium text-gray-300'
                              >
                                {deliveryMethod.title}
                              </RadioGroup.Label>
                              <RadioGroup.Description
                                as='span'
                                className='mt-1 flex items-center text-sm text-gray-500'
                              >
                                {deliveryMethod.turnaround}
                              </RadioGroup.Description>
                              <RadioGroup.Description
                                as='span'
                                className='mt-6 text-sm font-medium text-gray-300'
                              >
                                {deliveryMethod.price}
                              </RadioGroup.Description>
                            </span>
                          </span>
                          {checked ? (
                            <Icon
                              icon='mdi:check'
                              className='h-5 w-5 text-cyan-600'
                              aria-hidden='true'
                            />
                          ) : null}
                          <span
                            className={twMerge(
                              active ? 'border' : 'border-2',
                              checked
                                ? 'border-cyan-500'
                                : 'border-transparent',
                              'pointer-events-none absolute -inset-px rounded-lg'
                            )}
                            aria-hidden='true'
                          />
                        </>
                      )}
                    </RadioGroup.Option>
                  ))}
                </div>
              </RadioGroup>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PurchaseRelayForm;

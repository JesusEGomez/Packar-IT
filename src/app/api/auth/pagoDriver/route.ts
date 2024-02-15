import { connectDB } from "@/libs/mongodb";
import Stripe from "stripe";
import Profile from '@/models/perfil';
import { NextResponse } from "next/server";
import User from "@/models/user";
import { log } from "console";

const stripe = new Stripe(`${process.env.SK_STRIPE}`, {
    apiVersion: '2023-10-16',
  });

  export async function POST(request: Request) {
    try {
      await connectDB();
      const info = await request.json();
      console.log(info, 'soy info')
      const profile = await Profile.findOne({ userId: info.userId });
      
      //const customerId = user.customerId;
      const day = parseInt(info.dd);
      const month = parseInt(info.mm);
      const year = parseInt(info.aaaa);
              
        const account = await stripe.accounts.create({
          country: info.country,
          type: 'custom',
          default_currency: 'eur',
          business_type: 'company',
          capabilities: {
            card_payments: { requested: true },
            transfers: { requested: true },
          },
          external_account: 'btok_es',
          business_profile: {
            mcc: '5045',
            url: 'https://default.com',
          },
          company: {
            address: {
              city: info.city,
              line1: info.address,
              postal_code: info.zipCode,
              state: info.city,
              country: info.country,
            },
            tax_id: '000000000',
            name: info.name,
            phone: info.phone,
          },
        });
        const account1 = await stripe.accounts.update(
          account.id,
          {
            tos_acceptance: {
              date: 1609798905,
              ip: '8.8.8.8',
            },
          }
        );



        const person = await stripe.accounts.createPerson(
          account.id,
          {
            first_name: info.name,
            last_name: info.lastName,
            relationship: {
              representative: true,
              title: 'CEO',
            },
          }
        );
        const updatePerson = await stripe.accounts.updatePerson(
          account.id,
          person.id,
          {
            address: {
              city: info.city,
              line1: info.address,
              postal_code: info.zipCode,
              state: 'NY',
            },
            dob: {
              day,
              month,
              year,
            },
            ssn_last_4: '0000',
            phone: info.phone,
            email: info.email,
            relationship: {
              owner: true,
              percent_ownership: 100,
            },
          }
        );
        const lastAccount = await stripe.accounts.update(
          account.id,
          {
            company: {
              owners_provided: true,
            },
          }
        );
        profile.account = account.id;
        const newProfile = await profile.save();

        //const payment = await stripe.transfers.create({
        //   amount: 1,
        //   currency: 'eur',
        //   destination: 'acct_1OjlSMIWMBiZ1hOJ'
        // },
        // {
        //   stripeAccount: 'acct_1OjWSfIPT3NWX9vQ',
        // })
        console.log(profile)
        return NextResponse.json(account, { status: 200 })
    } catch (error) {
      console.error('Error en la función POST:', error);
    
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 500 });
        }
    
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
  }
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { toast } from '@/components/ui/use-toast';

const FormSchema = z.object({
  pin: z
    .string()
    .min(11, {
      message: '글자를 전부 채워야합니다.',
    })
    .refine((pin) => pin.startsWith('010'), {
      message: '"010"으로 시작해야합니다.',
    })
    .refine(
      (pin) => {
        // 확인: "010" 다음에 오는 문자들이 정확히 8개이며 모두 숫자인지 검사
        return pin.length === 11 && /^\d+$/.test(pin.slice(3));
      },
      {
        message: 'The PIN must consist of "010" followed by 8 numeric characters.',
      },
    ),
});

export function InputForm() {
  const methods = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: 'onChange',
    defaultValues: {
      pin: '',
    },
  });

  const { formState, handleSubmit, control } = methods;

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <div className="w-full ">
      <Form {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="mx-2 mb-3 space-y-6">
          <FormField
            control={control}
            name="pin"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputOTP maxLength={11} {...field}>
                    <InputOTPGroup className="w-1/3">
                      <InputOTPSlot className="bg-[#F2F2F2] mr-[0.1rem]" index={0} />
                      <InputOTPSlot className="bg-[#F2F2F2] mr-[0.1rem]" index={1} />
                      <InputOTPSlot className="bg-[#F2F2F2]" index={2} />
                    </InputOTPGroup>
                    <InputOTPGroup className="w-1/3">
                      <InputOTPSlot className="bg-[#F2F2F2] mr-[0.1rem]" index={3} />
                      <InputOTPSlot className="bg-[#F2F2F2] mr-[0.1rem]" index={4} />
                      <InputOTPSlot className="bg-[#F2F2F2] mr-[0.1rem]" index={5} />
                      <InputOTPSlot className="bg-[#F2F2F2]" index={6} />
                    </InputOTPGroup>
                    <InputOTPGroup className="w-1/3">
                      <InputOTPSlot className="bg-[#F2F2F2] mr-[0.1rem]" index={7} />
                      <InputOTPSlot className="bg-[#F2F2F2] mr-[0.1rem]" index={8} />
                      <InputOTPSlot className="bg-[#F2F2F2] mr-[0.1rem]" index={9} />
                      <InputOTPSlot className="bg-[#F2F2F2]" index={10} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />{' '}
          <div className="flex justify-center">
            <Button
              type="submit"
              className={formState.isValid ? '' : 'bg-[#ececec] text-[#a0a0a0]'}
            >
              인증 메시지 전송
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

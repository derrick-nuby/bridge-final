import React from 'react';
import Image from 'next/image';

export default function page() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Image
        src={'/images/qrcode.png'}
        alt={'Qr Code of Participro'}
        height={500}
        width={500}
      />
    </div>
  );
}

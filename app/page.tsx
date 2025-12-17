'use client';
import {Button} from 'antd'
import Link from 'next/link';
import { useTheme } from './context/ThemeContext';

export default function Home() {

  const { mode, toggleTheme } = useTheme();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
     <h1>Hello Sadia!</h1>

     <Button onClick={toggleTheme} type="primary">
        Toggle Theme
      </Button>

      <Link href="/todo">
        <Button type='primary'>Go to TODO Page</Button>
      </Link>

       <Link href="/table">
        <Button type='primary'>Go to table Page</Button>
      </Link>

      <Link href="/tab">
        <Button type='primary'>Go to tab Page</Button>
      </Link>

      <Link href="/modal">
        <Button type='primary'>Go to modal Page</Button>
      </Link>

      <Link href="/menu">
        <Button type='primary'>Go to menu Page</Button>
      </Link>

      <Link href="/form/login">
        <Button type='primary'>Go to login Page</Button>
      </Link>
      
      <Link href="/dashboard">
        <Button type='primary'>Go to dashboard Page</Button>
      </Link>

      <Link href="/auth">
        <Button type='primary'>Go to auth Page</Button>
      </Link>

    </div>
  );
}

import { redirect } from 'next/navigation';

export default function HomePage() {
  redirect('/reviews'); // Redirect to the reviews page
}
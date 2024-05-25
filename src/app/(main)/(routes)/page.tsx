import { Button } from '@/components/ui/button';
import { UserButton } from '@clerk/nextjs';

export default function Home() {
	return (
		<>
			<Button variant="ghost">Click me</Button>
			<UserButton afterSignOutUrl="/" />
		</>
	);
}

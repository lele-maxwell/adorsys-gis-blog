import {Container} from '@blog/components/container';
import icon from '@blog/components/icon.svg';
import {ThemeToggle} from '@blog/components/theme';
import {LanguageSwitcher} from '@blog/components/language-switcher';
import Image from 'next/image';
import Link from 'next/link';

export function AppNavBar() {
    return (
        <div className='sticky top-0 z-40 bg-white/10 backdrop-blur-xl border-b border-white/20'>
            <Container className='py-0'>
                <nav className='navbar'>
                    <div className='navbar-start flex gap-4'>
                        <Link href='/' className='flex flex-row items-center gap-2 group'>
                            <Image src={icon} className='w-8 transition-transform duration-300 group-hover:scale-110' alt='logo'/>
                            <span className='text-xl font-extrabold uppercase text-white/90 group-hover:text-primary transition-colors duration-300'>Learn</span>
                        </Link>
                    </div>
                    
                    <div className='navbar-end flex gap-4'>
                        <LanguageSwitcher />
                        <ThemeToggle/>
                    </div>
                </nav>
            </Container>
        </div>
    );
}

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Camera, Send, ThumbsUp, Video } from 'lucide-react';

export function Footer() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const logoSrc = (mounted && resolvedTheme === 'dark') ? '/logo/logotipo_branco.png' : '/logo/logotipo_azul.png';

  return (
    <footer className="bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Col */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              {mounted ? (
                <Image src={logoSrc} alt="XRLTech" width={120} height={40} className="h-8 w-auto" />
              ) : (
                <div className="h-8 w-[120px] bg-zinc-200 dark:bg-zinc-800 rounded" />
              )}
            </Link>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Sua parceira de confiança para as tecnologias mais avançadas. Inovação e qualidade em cada detalhe.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-zinc-400 hover:text-blue-600 transition-colors"><Camera size={20} /></Link>
              <Link href="#" className="text-zinc-400 hover:text-blue-600 transition-colors"><Send size={20} /></Link>
              <Link href="#" className="text-zinc-400 hover:text-blue-600 transition-colors"><ThumbsUp size={20} /></Link>
              <Link href="#" className="text-zinc-400 hover:text-blue-600 transition-colors"><Video size={20} /></Link>
            </div>
          </div>

          {/* Links Col 1 */}
          <div>
            <h4 className="font-bold text-zinc-900 dark:text-zinc-50 mb-6 uppercase text-xs tracking-widest">Loja</h4>
            <ul className="space-y-4 text-sm text-zinc-500">
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Todos os Produtos</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Hardware</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Periféricos</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Gaming</Link></li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div>
            <h4 className="font-bold text-zinc-900 dark:text-zinc-50 mb-6 uppercase text-xs tracking-widest">Suporte</h4>
            <ul className="space-y-4 text-sm text-zinc-500">
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Fale Conosco</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors">FAQ</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Envios & Devoluções</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Garantia</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-zinc-900 dark:text-zinc-50 mb-6 uppercase text-xs tracking-widest">Newsletter</h4>
            <p className="text-sm text-zinc-500 mb-4">Receba ofertas exclusivas e novidades.</p>
            <form className="flex gap-2">
              <input 
                type="email" 
                placeholder="Seu e-mail" 
                className="flex-1 px-4 py-2 rounded bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm focus:ring-2 ring-blue-500/50 outline-none"
              />
              <button className="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded hover:bg-blue-700 transition-colors">OK</button>
            </form>
          </div>
        </div>

        <div className="border-t border-zinc-200 dark:border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-400 font-medium">
          <p>© 2026 XRLTech. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Privacidade</Link>
            <Link href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Termos de Uso</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

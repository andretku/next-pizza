import { cn } from "@/shared/lib/utils";
import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui";
import { Container } from "./container";
import { SearchInput } from "./search-input";
import { CartButton } from "./cart-button";

interface Props {
  hasSearch?: boolean;
  hasCart?: boolean;
  className?: string;
}

export const Header = ({ hasSearch = true, hasCart = true, className }: Props) => {

  return (
    <header className={cn("border-b border-gray-100", className)}>
      <Container className="flex items-center justify-between py-8">
        {/* Left side */}
        <Link href="/">
          <div className="flex items-center gap-4">
            <Image src="/logo.png" alt="Logo" width={35} height={35} />
            <div>
              <h1 className="text-2xl uppercase font-black">Next Pizza</h1>
              <p className="text-sm text-gray-400 leading-3">вкусней уже некуда</p>
            </div>
          </div>
        </Link>

        {/* Search */}
        {hasSearch && (
          <div className="mx-10 flex-1">
            <SearchInput />
          </div>
        )}

        {/* Right side */}
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-1">
            <User size={16} />
            Войти
          </Button>
          {hasCart && <CartButton />}
        </div>
      </Container>
    </header>
  );
};

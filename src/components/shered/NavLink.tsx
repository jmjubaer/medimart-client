import Link from "next/link";
import { usePathname } from "next/navigation";
type IProps = {
    href: string;
    children: string;
};
const NavLink = ({ href, children }: IProps) => {
    const pathName = usePathname();
    return (
        <Link
            href={href}
            className={
                pathName == href
                    ? "text-primary font-bold"
                    : "text-gray-700 hover:text-primary transition-colors font-medium text-sm"
            }>
            {children}
        </Link>
    );
};

export default NavLink;

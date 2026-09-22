import SectionHeader from "@/components/common/SectionHeader";
import { Button } from "@/components/ui/button";
import { PackageIcon, PlusIcon } from "lucide-react";
import Link from "next/link";

const MyProductsHeader = () => {
	return (
		<div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
			<SectionHeader
				title="My Products"
				icon={PackageIcon}
				description="Manage your submissions and track their review status"
			/>
			<Link href="/submit">
				<Button>
					<PlusIcon className="mr-2 size-4" />
					Submit Product
				</Button>
			</Link>
		</div>
	);
};

export default MyProductsHeader;

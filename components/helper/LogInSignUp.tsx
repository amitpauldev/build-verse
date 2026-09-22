"use client";

import {
	Show,
	SignUpButton,
	SignInButton,
	UserButton,
	OrganizationSwitcher,
} from "@clerk/react";
import { Button } from "../ui/button";

import { Suspense } from "react";
import CustomUserButton from "../common/CustomUserButton";
import { LoaderIcon, SparklesIcon } from "lucide-react";
import Link from "next/link";

const LogInSignUp = () => {
	return (
		<>
			{/* <OrganizationSwitcher /> */}
			<Show when="signed-out">
				<SignInButton />
				<SignUpButton>
					<Button>Sign Up</Button>
				</SignUpButton>
			</Show>
			<Show when="signed-in">
				<Link href="submit" className="hidden sm:flex">
					<Button variant="outline" size="sm">
						<SparklesIcon className="size-4 mr-2" />
						<span>Share Project</span>
					</Button>
				</Link>
				{/* <UserButton /> */}
				<CustomUserButton />{" "}
				{/* Custom user button with organization switcher and admin panel link */}
			</Show>
		</>
	);
};

export default LogInSignUp;

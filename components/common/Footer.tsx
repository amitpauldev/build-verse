import Logo from "./Logo";

export default function Footer() {
	return (
		<footer className="border-t border-border bg-background">
			<div className="wrapper px-10 py-12">
				<div className="grid gap-10 md:grid-cols-4">
					{/* Brand */}
					<div className="space-y-4">
						<Logo />

						<p className="text-sm text-muted-foreground leading-relaxed">
							A community platform where creators showcase apps, AI tools, SaaS
							products, startups, and creative projects.
						</p>
					</div>

					{/* Explore */}
					<div>
						<h3 className="mb-4 font-semibold">Explore</h3>

						<ul className="space-y-2 text-sm text-muted-foreground">
							<li>
								<a href="#" className="hover:text-primary transition-colors">
									Discover Projects
								</a>
							</li>

							<li>
								<a href="#" className="hover:text-primary transition-colors">
									Trending
								</a>
							</li>

							<li>
								<a href="#" className="hover:text-primary transition-colors">
									Categories
								</a>
							</li>
						</ul>
					</div>

					{/* Community */}
					<div>
						<h3 className="mb-4 font-semibold">Community</h3>

						<ul className="space-y-2 text-sm text-muted-foreground">
							<li>
								<a href="#" className="hover:text-primary transition-colors">
									Launch a Project
								</a>
							</li>

							<li>
								<a href="#" className="hover:text-primary transition-colors">
									Feedback
								</a>
							</li>

							<li>
								<a href="#" className="hover:text-primary transition-colors">
									Guidelines
								</a>
							</li>
						</ul>
					</div>

					{/* Legal */}
					<div>
						<h3 className="mb-4 font-semibold">Legal</h3>

						<ul className="space-y-2 text-sm text-muted-foreground">
							<li>
								<a href="#" className="hover:text-primary transition-colors">
									Privacy Policy
								</a>
							</li>

							<li>
								<a href="#" className="hover:text-primary transition-colors">
									Terms of Service
								</a>
							</li>

							<li>
								<a href="#" className="hover:text-primary transition-colors">
									Contact
								</a>
							</li>
						</ul>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-sm text-muted-foreground md:flex-row">
					<p>© {new Date().getFullYear()} BuildVerse. All rights reserved.</p>

					<p>Built for creators, powered by community.</p>
				</div>
			</div>
		</footer>
	);
}

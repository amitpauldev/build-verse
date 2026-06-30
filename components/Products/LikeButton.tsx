"use client";

import Image from "next/image";
import { useOptimistic, useTransition } from "react";
import { toggleLike } from "@/lib/likes/like-actions";

type LikeButtonProps = {
	productId: number;
	initialLiked: boolean;
	voteCount: number;
};

export default function LikeButton({
	productId,
	initialLiked,
	voteCount: initialVoteCount,
}: LikeButtonProps) {
	const [isPending, startTransition] = useTransition();

	const [optimisticState, toggleOptimistic] = useOptimistic(
		{
			liked: initialLiked,
			voteCount: initialVoteCount,
		},
		(state) => ({
			liked: !state.liked,
			voteCount: state.liked ? state.voteCount - 1 : state.voteCount + 1,
		}),
	);

	const handleLike = () => {
		startTransition(async () => {
			// Update the UI immediately
			toggleOptimistic(null);

			// Update the database
			const result = await toggleLike(productId);
			// if user is not signed in
			if (result.error) alert(result.error);
		});
	};

	return (
		<div
			className="flex flex-col items-center gap-2 pl-2 border-l-2 border-gray-400"
			onClick={(e) => {
				e.preventDefault();
				e.stopPropagation();
			}}
		>
			<button onClick={handleLike} disabled={isPending}>
				<Image
					src={
						optimisticState.liked
							? "/love-svgrepo-com-red.svg"
							: "/love-svgrepo-com.svg"
					}
					width={34}
					height={34}
					alt="Like"
					className="cursor-pointer"
				/>
			</button>

			<span className="text-sm font-semibold">{optimisticState.voteCount}</span>
		</div>
	);
}

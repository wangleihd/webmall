import { Button, List, Rate, Divider } from "antd";
import { Review } from "@/types/review";
import { DislikeOutlined, LikeOutlined } from "@ant-design/icons";
import ReviewSummary from "./ReviewSummary";
import DetailTitle from "../Title";


export default function ReviewList({ reviews }: { reviews: Review[] }) {
	const product = {
		rating: 4.5,
		reviewCount: 100,

	}
	return (
		<div>
			<DetailTitle title="Reviews" />
			<ReviewSummary />
			<div className="my-4">
				<List
					itemLayout="vertical"
					dataSource={reviews}
					renderItem={review => (
						<List.Item className="border-b pb-4 mb-4">
							<div className="flex justify-between">
								<div className="flex items-center ml-1">
								<Rate disabled defaultValue={review.rating} />
								</div>

								<div className="flex items-cente">
									<Button className="flex items-center" type="text" icon={<LikeOutlined className="text-fta-primary-500" />}>
										{review.likes}
									</Button>
									<Button className="flex items-center" type="text" icon={<DislikeOutlined />}>
										{review.dislikes}
									</Button>
								</div>
							</div>
							<div className="mt-2 ml-1">
								<div className="mt-2 mb-1 text-gray-700">{review.comment}</div>
								<p className="mb-4 text-gray-300">{review.createdAt}</p>
							</div>
							<div className="flex items-center">
									<img src={review.profileImage} alt={review.username} className="w-10 h-10 rounded-full mr-2" />
									<span className="font-bold text-gray-800">{review.username}</span>
								</div>
						</List.Item>
					)}
				/>
			</div>
		</div>
	)
}
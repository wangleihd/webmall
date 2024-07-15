import { Button, List, Rate, Divider } from "antd";
import { Review } from "@/types/review";
import { DislikeOutlined, LikeOutlined } from "@ant-design/icons";
import ReviewSummary from "./ReviewSummary";
import DetailTitle from "../Title";


export default function ReviewList({ reviews }: { reviews: Review[] }) {
	return (
		<div>
			<DetailTitle title="Reviews" />
			<ReviewSummary />
			<Divider />
			<div className="">
				<List
					itemLayout="vertical"
					dataSource={reviews}
					renderItem={review => (
						<List.Item className="border-b pb-4 mb-4">
							<div className="flex justify-between">
								<div className="flex items-center">
									<img src={review.profileImage} alt={review.username} className="w-12 h-12 rounded-full mr-2" />
									<div>
										<h3 className="text-sm font-bold">{review.username}</h3>
										{/* <p className="text-sm text-fta-blake1">CHINA</p> */}
									</div>
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

							<div className="flex justify-between">
								<div className="flex items-center ml-1">
									<div className="w-12"></div>
									<Rate disabled style={{ fontSize: 16 }} allowHalf defaultValue={review.rating} />
									<div className="text-gray-700 text-md ml-4">{review.rating}</div>
								</div>
								<div className="flex items-center ml-1">
									<p className="text-gray-300">{review.createdAt}</p>
								</div>
							</div>

							<div className="pl-13 py-4">
								<p className="text-sm text-fta-blake">{review.comment}</p>
							</div>
						</List.Item>
					)}
				/>
				<button type="button" className="w-full mt-8 px-4 py-2.5 bg-transparent border border-orange-400 text-gray-800 font-semibold rounded-lg">Read all reviews</button>
			</div>
		</div>
	)
}
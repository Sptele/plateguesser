import { useState } from "react";

function Footer() {
	// Simple state for credits
	const [showCredits, setShowCredits] = useState(false);

	return (
		<footer className="sticky max-w-md mx-auto bg-white text-center">
			<small className="subtitle inline">
				{/* DON'T STEAL MY STUFF! */}
				&copy; Copyright {new Date().getFullYear()}, Gautam Khajuria. Under AGPLv3 License
			</small>

			<div className="flex flex-grow flex-cols subtitle">
				<a
					className="max-w-md mx-auto text-button"
					href="https://github.com/Sptele/plateguesser"
					target={"_blank"}
					rel="noreferrer"
				>
					Github
				</a>
				<button
					className={
						"max-w-[50%] mx-auto text-button" +
						(showCredits ? " clicked" : "")
					}
					onClick={() => setShowCredits(!showCredits)}
				>
					Credits
				</button>
			</div>
			{showCredits && (
				<div className="mx-auto border-2 border-gray-300 rounded-md subtitle p-2">
					Made by Gautam for fun, using React and TailwindCSS.
					<ul>
						<li>
							Data from{" "}
							<a
								href="https://github.com/veltman/ca-license-plates"
								target={"_blank"}
								rel="noreferrer"
							>
								Veltman's Github
							</a>
						</li>
						<li>
							CSV converted by{" "}
							<a
								href="https://www.convertcsv.com/csv-to-json.htm"
								target={"_blank"}
								rel="noreferrer"
							>
								ConvertCSV
							</a>
						</li>
						<li>
							Green, Red, Blue button CSS design by{" "}
							<a
								href="https://flowbite.com/docs/components/buttons/"
								target={"_blank"}
								rel="noreferrer"
							>
								Flowbite's buttons
							</a>
						</li>
					</ul>
				</div>
			)}
		</footer>
	);
}

export default Footer;

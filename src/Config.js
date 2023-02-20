function Config({ config, setConfig }) {
	return (
		<div className="flex flex-row flex-grow-0 max-w-md mx-auto">
			<div className="flex flex-col flex-grow-0 mx-auto">
				{Object.entries(config).map(([k, v]) => {
					let input = <></>; // Placeholder for the input element

					if (typeof v === "boolean") {
						// Show checkbox if boolean
						input = (
							<input
								className="col-span-1"
								type="checkbox"
								checked={v}
								onChange={(e) => {
									config[k] = e.target.checked;
									setConfig({ ...config });
								}}
							/>
						);
					} else if (typeof v === "number") {
						// Show number input if number
						// UNUSED
						input = (
							<div className="flex flex-row flex-grow-0">
								{/* Input */}
								<input
									type="number"
									className="w-12 border-b-2 border-blue-500 col-span-1 m-auto"
									placeholder={v}
									onChange={(e) => {
										config[k] = parseInt(e.target.value);
									}}
								/>
								{/* Submit */}
								<button
									className="bg-blue-500 inline px-1"
									onClick={() => setConfig({ ...config })}
								>
									→
								</button>
							</div>
						);
					}

					return (
						<label
							className="grid grid-cols-3 grid-rows-1 border-2 border-gray-500 mt-2 p-2"
							key={k}
						>
							<span className={"ml-2 mr-10 col-span-2"}>
								{/* Pretty - Replace Underscores with Spaces */}
								{k.replaceAll("_", " ")}
							</span>

							{input}
						</label>
					);
				})}
			</div>
		</div>
	);
}

export default Config;

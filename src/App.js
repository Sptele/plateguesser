import { useState } from "react";

import Guesser from "./Guesser";
import Config from "./Config";

/*
Links:
https://github.com/veltman/ca-license-plates
https://www.convertcsv.com/csv-to-json.htm
https://www.acme.com/licensemaker/
*/

function App() {
	const [config, setConfig] = useState({
		SHOW_DMV_COMMENTS: false,
		SHOW_PLATE_IMAGE: true,
		TIME_LIMIT: 0
	});
	return (
		<div className="text-center">
			<h1 className="text-6xl">Plate Guesser</h1>
			<h4 className="subtitle mt-2">
				Would you be fit as a DMV employee? Find out by guessing if the
				plates shown were approved or denied.<br />
				<br />
				The game is harder than it looks! By default, DMV Comments (which are essentially hints) are hidden to make it harder.
				Turn them on if you're stuck. Here are some other tips:
				<ul>
					<li>- The DMV is strict, so phrases that <em>could</em> could cause rejection usually do</li>
					<li>- The customer will usually provide an innocent meaning to their plate, so don't get mislead!</li>
					<li>- The reviewer is <em>human</em>, so they may not always be perfectly logical</li>
					<li>- Even though a plate may reference something explicit, the content may not be enough to get it rejected</li>
				</ul>
			</h4>

			<Guesser config={config} />
			<Config config={config} setConfig={setConfig} />
		</div>
	);
}

export default App;

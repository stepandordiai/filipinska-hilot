import type { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: BASE_URL,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 1,
			alternates: {
				languages: {
					cs: `${BASE_URL}/cs`,
					en: `${BASE_URL}/en`,
					"x-default": `${BASE_URL}/cs`,
				},
			},
		},
	];
}

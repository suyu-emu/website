export function generateBgSvg(size: number, color: string) {
	const svg = `<svg
	class="outlined-logo"
	width="${size}"
	height="${size}"
	viewBox="0 0 96 96"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<path
		fill-rule="evenodd"
		clip-rule="evenodd"
		d="M47.9985 2C36.6131 2 27.3713 11.2417 27.3713 22.6287C27.3713 34.0154 36.6131 43.2574 47.9985 43.2574C64.6221 43.2574 78.1148 56.7485 78.1148 73.3723C78.1148 77.301 77.3607 81.0561 75.9891 84.4997C86.9391 76.0868 94 62.8624 94 48.0005C94 22.6085 73.392 2 47.9985 2ZM25.3713 22.6287C25.3713 10.1372 35.5085 0 47.9985 0C74.4965 0 96 21.5039 96 48.0005C96 64.9212 87.228 79.8046 73.9948 88.3518L72.5787 87.0251C74.8311 82.9826 76.1148 78.3278 76.1148 73.3723C76.1148 57.8532 63.5176 45.2574 47.9985 45.2574C35.5085 45.2574 25.3713 35.1199 25.3713 22.6287ZM20.0107 11.5006C9.05987 19.9133 2 33.1381 2 48.0005C2 73.3926 22.6081 94.001 47.9985 94.001C59.3855 94.001 68.6282 84.759 68.6282 73.3723C68.6282 61.9857 59.3855 52.7436 47.9985 52.7436C31.3761 52.7436 17.8852 39.2524 17.8852 22.6287C17.8852 18.6998 18.6393 14.9443 20.0107 11.5006ZM0 48.0005C0 31.0799 8.77019 16.1962 22.0042 7.64919L23.4203 8.97585C21.1686 13.0184 19.8852 17.6732 19.8852 22.6287C19.8852 38.1479 32.4807 50.7436 47.9985 50.7436C60.4899 50.7436 70.6282 60.881 70.6282 73.3723C70.6282 85.8636 60.4899 96.001 47.9985 96.001C21.5034 96.001 0 74.4971 0 48.0005ZM43.0189 14.6674C43.0189 11.9182 45.2503 9.68675 47.9985 9.68675C50.7501 9.68675 52.9791 11.9184 52.9791 14.6674C52.9791 17.4161 50.7502 19.648 47.9985 19.648C45.2503 19.648 43.0189 17.4163 43.0189 14.6674ZM47.9985 11.6867C46.3552 11.6867 45.0189 13.0225 45.0189 14.6674C45.0189 16.3121 46.3552 17.648 47.9985 17.648C49.6448 17.648 50.9791 16.3123 50.9791 14.6674C50.9791 13.0223 49.6449 11.6867 47.9985 11.6867ZM35.0581 22.6287C35.0581 19.8794 37.2893 17.648 40.0384 17.648C42.7877 17.648 45.0189 19.8794 45.0189 22.6287C45.0189 25.3777 42.7877 27.6094 40.0384 27.6094C37.2892 27.6094 35.0581 25.3777 35.0581 22.6287ZM40.0384 19.648C38.3939 19.648 37.0581 20.9839 37.0581 22.6287C37.0581 24.2733 38.394 25.6094 40.0384 25.6094C41.683 25.6094 43.0189 24.2733 43.0189 22.6287C43.0189 20.9839 41.6831 19.648 40.0384 19.648ZM50.9791 22.6287C50.9791 19.8793 53.2109 17.648 55.9596 17.648C58.7113 17.648 60.9402 19.8797 60.9402 22.6287C60.9402 25.3774 58.7113 27.6094 55.9596 27.6094C53.2109 27.6094 50.9791 25.3778 50.9791 22.6287ZM55.9596 19.648C54.3153 19.648 52.9791 20.984 52.9791 22.6287C52.9791 24.2732 54.3154 25.6094 55.9596 25.6094C57.606 25.6094 58.9402 24.2736 58.9402 22.6287C58.9402 20.9836 57.606 19.648 55.9596 19.648ZM43.0189 30.5897C43.0189 27.8407 45.2504 25.6094 47.9985 25.6094C50.7501 25.6094 52.9791 27.841 52.9791 30.5897C52.9791 33.3387 50.7501 35.5704 47.9985 35.5704C45.2503 35.5704 43.0189 33.3389 43.0189 30.5897ZM47.9985 27.6094C46.3551 27.6094 45.0189 28.9451 45.0189 30.5897C45.0189 32.2347 46.3552 33.5704 47.9985 33.5704C49.6449 33.5704 50.9791 32.2349 50.9791 30.5897C50.9791 28.9449 49.6449 27.6094 47.9985 27.6094ZM43.0189 65.411C43.0189 62.6621 45.2503 60.4304 47.9985 60.4304C50.7502 60.4304 52.979 62.6623 52.979 65.411C52.979 68.16 50.7501 70.3917 47.9985 70.3917C45.2503 70.3917 43.0189 68.1602 43.0189 65.411ZM47.9985 62.4304C46.3552 62.4304 45.0189 63.7663 45.0189 65.411C45.0189 67.056 46.3551 68.3917 47.9985 68.3917C49.6449 68.3917 50.979 67.0562 50.979 65.411C50.979 63.7661 49.6448 62.4304 47.9985 62.4304ZM35.058 73.3723C35.058 70.623 37.2892 68.3917 40.0384 68.3917C42.7877 68.3917 45.0189 70.623 45.0189 73.3723C45.0189 76.1217 42.7877 78.353 40.0384 78.353C37.2892 78.353 35.058 76.1216 35.058 73.3723ZM40.0384 70.3917C38.3939 70.3917 37.058 71.7275 37.058 73.3723C37.058 75.0172 38.3939 76.353 40.0384 76.353C41.6831 76.353 43.0189 75.0171 43.0189 73.3723C43.0189 71.7275 41.6831 70.3917 40.0384 70.3917ZM50.979 73.3723C50.979 70.6229 53.2109 68.3917 55.9596 68.3917C58.7113 68.3917 60.9402 70.6233 60.9402 73.3723C60.9402 76.1213 58.7113 78.353 55.9596 78.353C53.2109 78.353 50.979 76.1217 50.979 73.3723ZM55.9596 70.3917C54.3153 70.3917 52.979 71.7276 52.979 73.3723C52.979 75.017 54.3153 76.353 55.9596 76.353C57.606 76.353 58.9402 75.0175 58.9402 73.3723C58.9402 71.7272 57.606 70.3917 55.9596 70.3917ZM43.0189 81.3336C43.0189 78.5844 45.2503 76.353 47.9985 76.353C50.7501 76.353 52.979 78.5846 52.979 81.3336C52.979 84.0823 50.7502 86.3143 47.9985 86.3143C45.2503 86.3143 43.0189 84.0825 43.0189 81.3336ZM47.9985 78.353C46.3551 78.353 45.0189 79.6887 45.0189 81.3336C45.0189 82.9783 46.3552 84.3143 47.9985 84.3143C49.6448 84.3143 50.979 82.9785 50.979 81.3336C50.979 79.6885 49.6449 78.353 47.9985 78.353Z"
		fill="${color}"
	/>
</svg>`;
	return svg;
}
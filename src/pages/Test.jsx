// import Handlebars from 'handlebars';
// import html2pdf from 'html2pdf.js';
// import { useContext, useRef } from 'react';
// import { useTranslation } from 'react-i18next';
// import { MainContext } from '../Context/MainContext';
// const generateHtmlContent = (template, data) => {
// 	const compiledTemplate = Handlebars.compile(template);
// 	return compiledTemplate(data);
// };

// const reportData = {
// 	name: 'Sample Report',
// 	date: '2024-06-30',
// 	details: [
// 		'Detail 1: Information about detail 1.',
// 		'Detail 2: Information about detail 2.',
// 		'Detail 3: Information about detail 3.',
// 	],
// };

// const templateContent = `
//     <div style="padding: 20px; font-family: Arial, sans-serif;">
//         <h1 style="color: #4CAF50;">Report</h1>
//         <p><strong>Date:</strong> {{date}}</p>
//         <p><strong>Name:</strong> {{name}}</p>
//         <h2>Details:</h2>
//         <ul>
//             {{#each details}}
//                 <li>{{this}}</li>
//             {{/each}}
//         </ul>
//     </div>
// `;

// const downloadPdf = () => {
// 	const element = document.createElement('div');
// 	element.innerHTML = generateHtmlContent(templateContent, reportData);

// 	const opt = {
// 		margin: 1,
// 		filename: 'report.pdf',
// 		image: { type: 'jpeg', quality: 0.98 },
// 		html2canvas: { scale: 2 },
// 		jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
// 	};
// 	html2pdf().from(element).set(opt).save();

// 	console.log('Downloading');
// };

// const Test = () => {
// 	const [t] = useTranslation()
// 	const iframeRef = useRef();
// 	const { direction } = useContext(MainContext)
// 	const printReport = () => {
// 		const htmlContent = generateHtmlContent(templateContent, reportData);

// 		const iframe = iframeRef.current;
// 		const doc = iframe.contentDocument || iframe.contentWindow.document;
// 		doc.open();
// 		doc.write(htmlContent);
// 		doc.close();

// 		iframe.contentWindow.focus();
// 		iframe.contentWindow.print();
// 	};
// 	return (
// 		<section dir={direction} class='bg-white w-full p-4 flex flex-col gap-y-2 '>
// 			<div class="info w-full flex items-end flex-col gap-y-2">
// 				<span class='w-full flex justify-end'>
// 					<img src='http://localhost:3000/assets/sanadSVG/sanadBgLogo.jpg' alt="Logo" />
// 				</span>
// 				<h4 class='text-textColor__2 font-semibold text-sm w-full text-start'>
// 					{t("Logs.centerName")} : fasdx
// 				</h4>
// 				<h5 class='text-textColor__2 font-semibold text-sm w-full text-start'>
// 					{t("homepage.centerCode")} :  afsd
// 				</h5>
// 			</div>
// 			<h3 class='w-full text-center   font-extrabold text-2xl '>
// 				{t("Logs.studentsInGroup")} 1
// 			</h3>
// 			<div className='w-full flex items-center justify-around  mt-3'>
// 				<div className="col flex flex-col gap-y-2">
// 					<h5 class='w-full   text-sm font-semibold text-textColor__2'>
// 						{t("Courses.courseName")} : fdsa
// 					</h5>
// 					<h5 class='w-full   text-sm font-semibold text-textColor__2'>
// 						{t("Logs.educationalStage")} : fasd
// 					</h5>
// 					<h5 class='w-full   text-sm font-semibold text-textColor__2'>
// 						{t("Courses.teacherName")} : asdjfn
// 					</h5>
// 					<h5 class='w-full   text-sm font-semibold text-textColor__2'>
// 						{t("homepage.attended")} : sfda
// 					</h5>
// 					<h5 class='w-full   text-sm font-semibold text-textColor__2'>
// 						{t("homepage.notAttended")} : fasdfs
// 					</h5>

// 				</div>



// 				<div className="col col flex flex-col gap-y-2">
// 					<h5 class='w-full   text-sm font-semibold text-textColor__2'>
// 						{t("SingleCourse.sessionNumber")} : asdfjks
// 					</h5>
// 					<h5 class='w-full   text-sm font-semibold text-textColor__2'>
// 						{t("SingleCourse.sessionName")} : jdsjf
// 					</h5>

// 					<h5 class='w-full   text-sm font-semibold text-textColor__2'>
// 						{t("Logs.teacherCode")} : sdfjks
// 					</h5>
// 					<h5 class='w-full   text-sm font-semibold text-textColor__2'>
// 						{t("homepage.allAttened")} : sdjfh
// 					</h5>
// 					<h5 class='w-full   text-sm font-semibold text-textColor__2'>
// 						{t("SingleCourse.sessionName")} : sdf
// 					</h5>
// 				</div>
// 			</div>
// 			<table class="min-w-full table-auto mt-4 border-collapse border border-input_border">
// 				<thead>
// 					<tr class="bg-gray-200 border border-input_border ">
// 						<th class="px-4 py-2 text-sm border border-input_border ">{t("Logs.studentName")}</th>
// 						<th class="px-4 py-2 text-sm border border-input_border ">{t("Logs.studentCode")}</th>
// 						<th class="px-4 py-2 text-sm border border-input_border ">{t("PopupWindows.cardCode")}</th>
// 						<th class="px-4 py-2 text-sm border border-input_border ">{t("register.phoneNumber")}</th>
// 						<th class="px-4 py-2 text-sm border border-input_border ">{t("SingleGroup.paymentType")}</th>
// 						<th class="px-4 py-2 text-sm border border-input_border ">{t("Logs.studentCase")}</th>
// 					</tr>
// 				</thead>
// 				<tbody>

// 					<tr class="bg-white border border-input_border text-center">
// 						<td class="px-4 py-2 border text-xs border-input_border ">fsad</td>
// 						<td class="px-4 py-2 border text-xs border-input_border ">fds</td>
// 						<td class="px-4 py-2 border text-xs border-input_border ">dfas</td>
// 						<td class="px-4 py-2 border text-xs border-input_border ">fada</td>
// 						<td class="px-4 py-2 border text-xs border-input_border ">fdas</td>
// 						<td class="px-4 py-2 border text-xs border-input_border ">fdas</td>

// 					</tr>

// 				</tbody>
// 			</table>
// 		</section>
// 	);
// };
// export default Test;

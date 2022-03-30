import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { toast } from "react-toastify";

const noti = (mess, type) => {
	switch (type) {
		case "success": {
			toast.success(mess, {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
			break;
		}
		case "error": {
			toast.error(mess, {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
			break;
		}
		default:
	}
};

const handleFetchData = async (vien, malop, ky, setRes) => {
	try {
		const codeVien = [
			`7|0|10|https://qldt.hust.edu.vn/soicteducationstudent/|95AD0BB3329303F1FDC881BF22DC9372|com.soict.edu.core.client.DataService|searchClasses|java.lang.String/2004016611|java.lang.Long/4227064769|java.util.List|${ky}|java.util.Arrays$ArrayList/2507071751|${malop}|1|2|3|4|4|5|6|6|7|8|6|VjLdoAAAA|6|P__________|9|1|5|10|`, // CNTT
			`7|0|10|https://qldt.hust.ed.vn/soicteducationstudent/|64A3D74A7F505C8AE0C51B09092739A7|com.soict.edu.core.client.DataService|searchClasses|java.lang.String/2004016611|java.lang.Long/4227064769|java.util.List|${ky}|java.util.Arrays$ArrayList/2507071751|${malop}|1|2|3|4|4|5|6|6|7|8|6|QzaRkAAAA|6|P__________|9|1|5|10|`, // ĐTVT
			`7|0|10|https://qldt.hust.edu.vn/soicteducationstudent/|9F211F00436C29DE2DC331C6082A6793|com.soict.edu.core.client.DataService|searchClasses|java.lang.String/2004016611|java.lang.Long/4227064769|java.util.List|${ky}|java.util.Arrays$ArrayList/2507071751|${malop}|1|2|3|4|4|5|6|6|7|8|6|T6zasAAAA|6|P__________|9|1|5|10|`, // Điện
		];
		const headers = {
			accept: "*/*",
			"accept-language":
				"vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5",
			"content-type": "text/x-gwt-rpc; charset=UTF-8",
			"sec-ch-ua":
				'"Google Chrome";v="87", " Not;A Brand";v="99", "Chromium";v="87"',
			"sec-ch-ua-mobile": "?0",
			"sec-fetch-dest": "empty",
			"sec-fetch-mode": "cors",
			"sec-fetch-site": "same-origin",
			"x-gwt-module-base": "https://qldt.hust.edu.vn/soicteducationstudent/",
			"x-gwt-permutation": "657CC2B6DE59491D5D25A1DD806A190B",
		};
		const raw_data = codeVien[vien];
		const auth_url = "https://qldt.hust.edu.vn/soicteducationstudent/data";

		const responsive = await axios({
			url: auth_url,
			method: "post",
			headers: headers,
			data: raw_data,
		});
		const data = responsive.data;
		const start = data.indexOf('["java');
		const end = data.lastIndexOf("]");
		const Teams = data.substr(start, end - start - 4);
		const CodeTeams = JSON.parse(Teams);
		if (CodeTeams.length < 10) {
			noti("Không tìm thấy lớp hợp lệ", "error");
			return;
		}
		let linkTeams;
		let email;
		let gv;
		let sub;
		for (var i = 0; i < CodeTeams.length; i++) {
			if (CodeTeams[i].indexOf("https://") > -1) {
				linkTeams = CodeTeams[i];
			}
			if (CodeTeams[i].indexOf("java.lang.Boolean") > -1) {
				gv = CodeTeams[i + 2];
			}
			if (CodeTeams[i].indexOf("java.util.HashMap") > -1) {
				if (CodeTeams[i + 2] !== "") {
					sub = CodeTeams[i + 1];
				} else {
					sub = CodeTeams[i + 3];
				}
			}
			if (CodeTeams[i].indexOf("@hust.edu.vn") > -1) {
				email = CodeTeams[i];
			}
		}
		setRes({
			codeTeams: CodeTeams[2],
			linkTeams: linkTeams,
			email: email,
			gv: gv,
			sub: sub,
		});
	} catch (error) {
		console.log(error);
		noti("Mã lớp học không tồn tại", "error");
	}
};
const VienStyled = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 30px;
`;
const Body = styled.div`
	width: 600px;
	margin: 0 auto;
	padding: 20px;
	font-size: 25px;
`;
const LabelStyled = styled.label`
	font-size: 25px;
	margin-right: 20px;
`;
const SelectStyled = styled.select`
	font-size: 25px;
	width: 140px;
`;
const Input = styled.input`
	font-size: 25px;
`;
const Button = styled.button`
	width: 100%;
	border: 0px;
	padding: 10px;
	font-size: 25px;
	margin-top: 20px;
	background-color: #2979ff;
	color: white;
	border-radius: 8px;
	cursor: pointer;
`;
const Error = styled.p`
	font-size: 15px;
	color: red;
`;
export default function GetTeamsCode() {
	const [res, setRes] = useState();
	const [error, setError] = useState();
	const [vien, setVien] = useState(0);
	const [ky, setKy] = useState("20211");
	const [malop, setMaLop] = useState("");
	const handleChangeVien = (e) => {
		setVien(e.target.value);
	};
	const handleChangeKy = (e) => {
		setKy(e.target.value);
	};
	const handleChangeMaLop = (e) => {
		setMaLop(e.target.value);
		setError("");
	};
	const handleCheck = () => {
		if (malop.length !== 6 || !/^\d+$/.test(malop)) {
			setError("Vui lòng nhập lại mã lớp");
		} else handleFetchData(vien, malop, ky, setRes);
	};
	return (
		<Body>
			<div>
				<VienStyled>
					<div>
						<LabelStyled htmlFor=''>Viện:</LabelStyled>
						<SelectStyled
							name=''
							id=''
							value={vien}
							onChange={handleChangeVien}
						>
							<option value='0'>CNTT</option>
							<option value='1'>ĐTVT</option>
							<option value='2'>ĐIỆN</option>
						</SelectStyled>
					</div>
					<div>
						<LabelStyled htmlFor=''>Kỳ học:</LabelStyled>
						<SelectStyled name='' id='' value={ky} onChange={handleChangeKy}>
							<option value='20211'>2021-1</option>
							<option value='20212'>2020-2</option>
							<option value='20212'>2020-1</option>
							<option value='20212'>2020-3</option>
							<option value='20212'>2019-2</option>
						</SelectStyled>
					</div>
				</VienStyled>
				<LabelStyled htmlFor=''>Mã lớp:</LabelStyled>
				<Input type='text' value={malop} onChange={handleChangeMaLop} />
				{error && <Error>{error}</Error>}
				<Button onClick={handleCheck}>Check</Button>
			</div>

			{res && (
				<div>
					<h3>Môn học: {res.sub}</h3>
					<h3>Code: {res.codeTeams || "Không có code Teams"}</h3>
					<h3>
						Link:{" "}
						{res.linkTeams ? (
							<a href={res.linkTeams}>Link teams</a>
						) : (
							"Không có link Teams"
						)}
					</h3>
					<h3>Email: {res.email}</h3>
					<h3>Giảng viên: {res.gv}</h3>
				</div>
			)}
		</Body>
	);
}

// import React, { useState, useRef, useEffect } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// // import { Tooltip } from "react-tooltip";
// import { IoArrowRedo } from "react-icons/io5";
// import { IoMdArrowRoundForward } from "react-icons/io";
// // import { useSpring, animated } from "react-spring";
// import { useDisclosure } from '@mantine/hooks';
// import { Modal, Button } from '@mantine/core';
// // import { Modal, Button } from '@mantine/core';
// // import 'bootstrap/dist/css/bootstrap.min.css';

// const Signature_image_view = ({id}) => {
//   const [sigStringData, setSigStringData] = useState("");
//   const [sigImageData, setSigImageData] = useState("");
//   const [imageCapturedData, setImageCapturedData] = useState("");
//   const [check, setCheck] = useState(false);
//   const [refresh, setRefresh] = useState(false);
//   const [capturedImage, setCapturedImage] = useState(null);
//   // const [opened, setOpened] = useState(false);
//   const [show, setShow] = useState(false);

//   const [opened, { open, close }] = useDisclosure(false);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   const clearImage = () => {
//     // Clear the captured image state
//     setCapturedImage(null);

//     // Clear the file input by resetting its value
//     const fileInput = document.getElementById("imageInputCap");
//     if (fileInput) {
//       fileInput.value = "";
//     }

//     // Clear the canvas by getting its context and clearing it
//     const canvas = document.getElementById("imageCnv");
//     if (canvas) {
//       const ctx = canvas.getContext("2d");
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//     }
//   };

//   const submitForm = () => {
//     const formData = new FormData();
//     formData.append("sigStringData", sigStringData);
//     formData.append("sigImageData", sigImageData);
//     formData.append("imageCapturedData", imageCapturedData);

//     fetch("http://localhost:3001/process_form", {
//       method: "POST",
//       body: formData,
//     })
//       .then((response) => response.text())
//       .then((data) => {
//         console.log(data);
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//   };

//   const handleImageCapture = (event, canvasId, imageId) => {
//     const fileInput = event.target;
//     const canvas = document.getElementById(canvasId);

//     if (fileInput.files.length > 0) {
//       const file = fileInput.files[0];

//       const reader = new FileReader();
//       reader.onload = function (e) {
//         const imageUrl = e.target.result;

//         const ctx = canvas.getContext("2d");
//         const img = new Image();
//         img.onload = function () {
//           ctx.clearRect(0, 0, canvas.width, canvas.height);
//           ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
//         };
//         img.src = imageUrl;
//       };

//       reader.readAsDataURL(file);
//     }
//   };

//   //SigWebTablet JavaScript File for SigWeb
//   //
//   //Version - 1.0.4.0
//   //
//   //Last updated by Topaz Systems Inc. - 1/5/2021
//   //

//   var getBlobURL =
//     (window.URL && URL.createObjectURL.bind(URL)) ||
//     (window.URL && URL.createObjectURL.bind(URL)) ||
//     window.createObjectURL;
//   var revokeBlobURL =
//     (window.URL && URL.revokeObjectURL.bind(URL)) ||
//     (window.URL && URL.revokeObjectURL.bind(URL)) ||
//     window.revokeObjectURL;

//   var baseUri = makeUri();
//   var ctx;

//   function IsSigWebInstalled() {
//     var xhr = new XMLHttpRequest();
//     try {
//       xhr.onreadystatechange = function () {
//         if (xhr.readyState == 4 && xhr.status == 0) {
//           console.log(
//             "Unknown Error Occured. SigWeb Service response not received."
//           );
//           return false;
//         }
//       };
//       xhr.open(
//         "GET",
//         baseUri + "TabletState" + "?noCache=" + generateUUID(),
//         false
//       );
//       xhr.send();
//     } catch (e) {
//       console.log("catch", e);
//     }

//     return xhr.status != 404 && xhr.status != 0;
//   }

//   function isIE() {
//     return (
//       navigator.appName == "Microsoft Internet Explorer" ||
//       (navigator.appName == "Netscape" &&
//         new RegExp("Trident/.*rv:([0-9]{1,}[.0-9]{0,})").exec(
//           navigator.userAgent
//         ) != null)
//     );
//   }

//   function isChrome() {
//     var ua = navigator.userAgent;
//     var chrome = false;

//     //Javascript Browser Detection - Chrome
//     if (ua.lastIndexOf("Chrome/") > 0) {
//       //var version = ua.substr(ua.lastIndexOf('Chrome/') + 7, 2);
//       return true;
//     } else {
//       return false;
//     }
//   }

//   function makeUri() {
//     var prot = window.location.protocol;
//     if (prot == "file:") {
//       prot = "http:";
//     }

//     if (isIE()) {
//       if (prot == "https:") {
//         return prot + "//tablet.sigwebtablet.com:47290/SigWeb/";
//       } else {
//         return prot + "//tablet.sigwebtablet.com:47289/SigWeb/";
//       }
//     }

//     if (isChrome()) {
//       if (prot == "https:") {
//         return prot + "//tablet.sigwebtablet.com:47290/SigWeb/";
//       } else {
//         return prot + "//tablet.sigwebtablet.com:47289/SigWeb/";
//       }
//     } else {
//       //FIREFOX
//       if (prot == "https:") {
//         return prot + "//tablet.sigwebtablet.com:47290/SigWeb/";
//       } else {
//         return prot + "//tablet.sigwebtablet.com:47289/SigWeb/";
//       }
//     }
//   }

//   // function SigWebcreateXHR() {
//   // 	try { return new XMLHttpRequest(); } catch (e) { }
//   // 	try { return new ActiveXObject("Msxml2.XMLHTTP.6.0"); } catch (e) { }
//   // 	try { return new ActiveXObject("Msxml2.XMLHTTP.3.0"); } catch (e) { }
//   // 	try { return new ActiveXObject("Msxml2.XMLHTTP"); } catch (e) { }
//   // 	try { return new ActiveXObject("Microsoft.XMLHTTP"); } catch (e) { }

//   // 	alert("XMLHttpRequest not supported");
//   // 	return null;
//   // }

//   function SigWebcreateXHR() {
//     if (window.XMLHttpRequest) {
//       return new XMLHttpRequest();
//     } else {
//       console.error("XMLHttpRequest not supported");
//       return null;
//     }
//   }

//   function SigWebSetProperty(prop) {
//     var xhr = SigWebcreateXHR();

//     if (xhr) {
//       xhr.open("POST", baseUri + prop, true);
//       xhr.send(null);
//       if (xhr.readyState == 4 && xhr.status == 200) {
//         return xhr.responseText;
//       }
//     }
//     return "";
//   }

//   var Count = false;

//   // function SigWebSetProperty(prop) {
//   // 	var xhr = SigWebcreateXHR();

//   // 	if (xhr) {
//   // 		xhr.open("POST", baseUri + prop, true);
//   // 		xhr.send(null);
//   // 		if (xhr.readyState == 4 && xhr.status == 200) {
//   // 			return xhr.responseText;
//   // 		}
//   // 	}
//   // 	return "";
//   // }

//   function SigWebSetPropertySync(prop) {
//     var xhr = SigWebcreateXHR();

//     if (xhr) {
//       xhr.open("POST", baseUri + prop, false);
//       xhr.send();
//       if (xhr.readyState == 4 && xhr.status == 200) {
//         return xhr.responseText;
//       }
//     }
//     return "";
//   }

//   function SigWebSetStreamProperty(prop, strm) {
//     var xhr = SigWebcreateXHR();

//     if (xhr) {
//       xhr.open("POST", baseUri + prop);
//       xhr.setRequestHeader("Content-Type", "text/plain");
//       xhr.send(strm);
//       //			if (xhr.readyState == 4 && xhr.status == 200) {
//       //				return xhr.responseText;
//       //			}
//     }
//     return "";
//   }

//   function SigWebSyncSetStreamProperty(prop, strm) {
//     var xhr = SigWebcreateXHR();

//     if (xhr) {
//       xhr.open("POST", baseUri + prop, false);
//       xhr.setRequestHeader("Content-Type", "text/plain");
//       xhr.send(strm);
//       if (xhr.readyState == 4 && xhr.status == 200) {
//         return xhr.responseText;
//       }
//     }
//     return "";
//   }

//   function SigWebSetImageStreamProperty(prop, strm) {
//     var xhr = SigWebcreateXHR();

//     if (xhr) {
//       xhr.open("POST", baseUri + prop, false);
//       xhr.setRequestHeader("Content-Type", "image/png");
//       xhr.send(strm);
//       if (xhr.readyState == 4 && xhr.status == 200) {
//         return xhr.responseText;
//       }
//     }
//     return "";
//   }

//   function SigWebSetImageBlobProperty(prop, strm) {
//     var xhr = SigWebcreateXHR();

//     //			var bb = new BlobBuilder();
//     //			bb.append( strm );
//     //			bb.append( "\0" );
//     //			var blob = bb.getBlob( );

//     if (xhr) {
//       xhr.open("POST", baseUri + prop, false);
//       xhr.setRequestHeader("Content-Type", "blob");
//       xhr.send(strm);
//       if (xhr.readyState == 4 && xhr.status == 200) {
//         return xhr.responseText;
//       }
//     }
//     return "";
//   }

//   function SigWebGetProperty(prop) {
//     var xhr = SigWebcreateXHR();

//     if (xhr) {
//       xhr.open("GET", baseUri + prop + "?noCache=" + generateUUID(), false);
//       xhr.send(null);
//       if (xhr.readyState == 4 && xhr.status == 200) {
//         return xhr.responseText;
//       }
//     }
//     return "";
//   }

//   var SigImageB64;

//   //	function GetSigImageB64(callback)
//   //		{
//   //		var cvs = document.createElement('canvas');
//   //		cvs.width = GetImageXSize();
//   //		cvs.height = GetImageYSize();
//   //
//   //		var xhr2 = new XMLHttpRequest();
//   //		xhr2.open("GET", baseUri + "SigImage/1", false);
//   //		xhr2.responseType = "blob";
//   //		xhr2.send(null);
//   //		if (xhr2.readyState == 4 && xhr.status == 200)
//   //			{
//   //			var cntx = cvs.getContext('2d');
//   //			var img = new Image();
//   //			img.src = window.URL.createObjectURL(xhr2.response);
//   //			img.onload = function ()
//   //				{
//   //				cntx.drawImage(img, 0, 0);
//   //				var b64String = cvs.toDataURL("image/png");
//   //				var loc = b64String.search("base64,");
//   //				var retstring = b64String.slice(loc + 7, b64String.length);
//   //				if (callback)
//   //					{
//   //					callback(retstring);
//   //					}
//   //				}
//   //			}
//   //		}

//   // function GetSigImageB64(callback) {
//   //   var cvs = document.createElement("canvas");
//   //   cvs.width = GetImageXSize();
//   //   cvs.height = GetImageYSize();

//   //   var xhr2 = new XMLHttpRequest();
//   //   xhr2.open(
//   //     "GET",
//   //     baseUri + "SigImage/1" + "?noCache=" + generateUUID(),
//   //     true
//   //   );
//   //   xhr2.responseType = "blob";
//   //   xhr2.send(null);
//   //   xhr2.onload = function () {
//   //     var cntx = cvs.getContext("2d");
//   //     var img = new Image();
//   //     //			img.src = window.URL.createObjectURL(xhr2.response);
//   //     img.src = getBlobURL(xhr2.response);
//   //     img.onload = function () {
//   //       cntx.drawImage(img, 0, 0);
//   //       var b64String = cvs.toDataURL("image/png");
//   //       var loc = b64String.search("base64,");
//   //       var retstring = b64String.slice(loc + 7, b64String.length);
//   //       if (callback) {
//   //         callback(retstring);
//   //       }
//   //     };
//   //   };
//   // }

//   function GetSigImageB64(callback) {
//     var cvs = document.createElement("canvas");
//     cvs.width = GetImageXSize();
//     cvs.height = GetImageYSize();

//     var xhr2 = new XMLHttpRequest();
//     xhr2.open(
//         "GET",
//         baseUri + "SigImage/1" + "?noCache=" + generateUUID(),
//         true
//     );
//     xhr2.responseType = "blob";
//     xhr2.send(null);
//     xhr2.onload = function () {
//         var cntx = cvs.getContext("2d");
//         var img = new Image();
//         //			img.src = window.URL.createObjectURL(xhr2.response);
//         img.src = getBlobURL(xhr2.response);
//         img.onload = function () {
//             cntx.drawImage(img, 0, 0);
//             var b64String = cvs.toDataURL("image/jpeg"); // Change "image/png" to "image/jpeg"
//             var retstring = b64String.replace(/^data:image\/jpeg;base64,/, ''); // Remove existing prefix
//             if (callback) {
//                 callback("data:image/jpeg;base64," + retstring); // Concatenate new prefix
//             }
//         };
//     };
//   }

//   function SigWebWaitForPenDown(callback) {
//     var xhr = SigWebcreateXHR();

//     if (xhr) {
//       xhr.open(
//         "GET",
//         baseUri + "WaitForPenDown" + "?noCache=" + generateUUID()
//       );
//       xhr.timeout = 10000;
//       xhr.onreadystatechange = function () {
//         if (xhr.readyState != 4) return;
//         if (xhr.status == 200) callback();
//       };
//       xhr.send(null);
//     }
//   }

//   function GetSigImage(ctx) {
//     var xhr2 = new XMLHttpRequest();
//     xhr2.open(
//       "GET",
//       baseUri + "SigImage/1" + "?noCache=" + generateUUID(),
//       true
//     );
//     xhr2.responseType = "blob";
//     xhr2.send(null);
//     xhr2.onload = function () {
//       var img = new Image();
//       img.src = getBlobURL(xhr2.response);
//       img.onload = function () {
//         ctx.drawImage(img, 0, 0);
//         revokeBlobURL(this.src);
//         img = null;
//       };
//     };
//   }

//   var EvStatus;
//   var onSigPenDown;
//   var onSigPenUp;

//   function SigWebSetDisplayTarget(obj) {
//     ctx = obj;
//   }

//   var NumPointsLastTime = 0;

//   function SigWebRefresh() {
//     var NumPoints = NumberOfTabletPoints();
//     if (NumPoints == NumPointsLastTime) {
//       return;
//     }
//     NumPointsLastTime = NumPoints;

//     var xhr2 = new XMLHttpRequest();
//     xhr2.open(
//       "GET",
//       baseUri + "SigImage/0" + "?noCache=" + generateUUID(),
//       true
//     );
//     xhr2.responseType = "blob";
//     xhr2.onload = function () {
//       var img = new Image();
//       img.src = getBlobURL(xhr2.response);
//       //				img.src = window.URL.createObjectURL(xhr2.response);
//       img.onload = function () {
//         ctx.drawImage(img, 0, 0);
//         revokeBlobURL(this.src);
//         img = null;
//       };
//     };
//     xhr2.send(null);
//   }

//   function SigWebEvent() {
//     var OldEvStatus = EvStatus;

//     var xhr = SigWebcreateXHR();

//     if (xhr) {
//       xhr.open(
//         "GET",
//         baseUri + "EventStatus" + "?noCache=" + generateUUID(),
//         true
//       );
//       xhr.onload = function () {
//         EvStatus = xhr.responseText;
//         if (OldEvStatus & 0x01 && EvStatus & 0x02) {
//           if (onSigPenDown) {
//             onSigPenDown();
//           }
//         }

//         if (OldEvStatus & 0x02 && EvStatus & 0x01) {
//           if (onSigPenUp) {
//             onSigPenUp();
//           }
//         }
//       };
//       xhr.send(null);
//     }
//   }

//   function generateUUID() {
//     var d = new Date().getTime();
//     if (
//       typeof performance !== "undefined" &&
//       typeof performance.now === "function"
//     ) {
//       d += performance.now(); //use high-precision timer if available
//     }
//     return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
//       /[xy]/g,
//       function (c) {
//         var r = (d + Math.random() * 16) % 16 | 0;
//         d = Math.floor(d / 16);
//         return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
//       }
//     );
//   }

//   var SigWebFontThreshold = 155;

//   function setSigWebFontThreshold(v) {
//     SigWebFontThreshold = v;
//   }

//   function createLcdBitmapFromCanvas(ourCanvas, xp, yp, width, height) {
//     var canvasCtx = ourCanvas.getContext("2d");
//     var imgData = canvasCtx.getImageData(0, 0, width, height);
//     var j = 0;
//     var sVal = 0;
//     var outData = "";
//     var outIdx = 0;
//     var data = imgData.data;

//     for (var y = 0; y < height; y++)
//       for (var x = 0; x < width; x++) {
//         var tmp1 = data[j];
//         var tmp2 = data[j + 1];
//         var tmp3 = data[j + 2];
//         var tmp4 = data[j + 3];

//         //					sVal = tmp1 + (tmp2 << 8 ) + ( tmp3 << 16 ) + (tmp4 << 24 );
//         j = j + 4;
//         if (tmp1 < SigWebFontThreshold) {
//           outData += "B";
//         } else {
//           outData += "W";
//         }
//       }

//     return outData;
//   }

//   function toHex(NibVal) {
//     switch (NibVal) {
//       case 0:
//         return "0";
//       case 1:
//         return "1";
//       case 2:
//         return "2";
//       case 3:
//         return "3";
//       case 4:
//         return "4";
//       case 5:
//         return "5";
//       case 6:
//         return "6";
//       case 7:
//         return "7";
//       case 8:
//         return "8";
//       case 9:
//         return "9";
//       case 10:
//         return "A";
//       case 11:
//         return "B";
//       case 12:
//         return "C";
//       case 13:
//         return "D";
//       case 14:
//         return "E";
//       case 15:
//         return "F";
//     }
//   }

//   function ToHexString(ByteVal) {
//     var Str = "";
//     Str += toHex((ByteVal >> 4) & 0x0f);
//     Str += toHex(ByteVal & 0x0f);
//     return Str;
//   }

//   function textToTablet(x, y, height, str, fnt) {
//     var c = document.createElement("canvas");
//     var cntx = c.getContext("2d");
//     cntx.font = fnt;
//     var txt = str;
//     var xs = Math.round(cntx.measureText(txt).width);
//     var ys = height;
//     c.width = xs;
//     c.height = ys;

//     cntx.font = fnt;
//     cntx.fillStyle = "#FFFFFF";
//     cntx.rect(0, 0, xs, ys);
//     cntx.fill();

//     cntx.fillStyle = "#000000";
//     cntx.textBaseline = "top";
//     cntx.fillText(txt, 0, 0);

//     cntx.drawImage(cntx.canvas, 0, 0, xs, ys);

//     var Gstr = createLcdBitmapFromCanvas(c, 0, 0, xs, ys);

//     LcdWriteImageStream(0, 2, x, y, xs, ys, Gstr);
//   }

//   function LcdWriteImage(Dst, Mode, Xp, Yp, Url) {
//     var Prop = "LcdWriteImage/";
//     var NewUrl = Url.replace(/\//g, "_");

//     Prop = Prop + Dst + "," + Mode + "," + Xp + "," + Yp + "," + NewUrl;
//     SigWebSetPropertySync(Prop);
//   }

//   function LcdWriteLocalImage(Dst, Mode, Xp, Yp, Url) {
//     var Prop = "LcdWriteImage/";

//     Prop = Prop + Dst + "," + Mode + "," + Xp + "," + Yp + "," + Url;
//     SigWebSetProperty(Prop);
//   }

//   function LcdWriteImageStream(Dst, Mode, Xp, Yp, Xs, Ys, Url) {
//     var Prop1 =
//       "LcdWriteImageStreamParams/" +
//       Dst +
//       "," +
//       Mode +
//       "," +
//       Xp +
//       "," +
//       Yp +
//       "," +
//       Xs +
//       "," +
//       Ys;
//     var Prop2 = "LcdWriteImageStream/";

//     SigWebSetPropertySync(Prop1);
//     SigWebSetImageStreamProperty(Prop2, Url);
//   }

//   function LcdWriteImageBlob(Dst, Mode, Xp, Yp, Xs, Ys, Url) {
//     var Prop = "LcdWriteImageStream/";

//     Prop = Prop + Dst + "," + Mode + "," + Xp + "," + Yp + "," + Xs + "," + Ys;
//     SigWebSetImageBlobProperty(Prop, Url);
//   }

//   function measureText(pText, pFontSize, pStyle) {
//     var lDiv = document.createElement("lDiv");

//     document.body.appendChild(lDiv);

//     if (pStyle != null) {
//       lDiv.style = pStyle;
//     }
//     lDiv.style.fontSize = "" + pFontSize + "px";
//     lDiv.style.position = "absolute";
//     lDiv.style.left = -1000;
//     lDiv.style.top = -1000;

//     lDiv.innerHTML = pText;

//     var lResult = {
//       width: lDiv.clientWidth,
//       height: lDiv.clientHeight,
//     };

//     document.body.removeChild(lDiv);
//     lDiv = null;

//     return lResult;
//   }

//   function GetSigWebVersion() {
//     var prop = "SigWebVersion";

//     var xhr = SigWebcreateXHR();

//     if (xhr) {
//       xhr.open("GET", baseUri + prop + "?noCache=" + generateUUID(), false);
//       xhr.send(null);
//       if (xhr.readyState == 4 && xhr.status == 200) {
//         return xhr.responseText.slice(1, xhr.responseText.length - 1);
//       } else {
//         return "1.5"; //the currentversion of the SigWeb service is not installed
//       }
//     }
//     return "";
//   }

//   //
//   //
//   //
//   //
//   //
//   //
//   //			Start of dll method wrappers
//   //
//   //
//   //			SigPlusNET.cs
//   //
//   function GetVersionString() {
//     var Prop = "Version";

//     Prop = Prop;
//     var Str = SigWebGetProperty(Prop);
//     var trimStr = Str.slice(1, Str.length - 2);
//     return trimStr;
//   }

//   function IsPenDown() {
//     return EvStatus & 0x01;
//   }

//   function GetDaysUntilCertificateExpires() {
//     var Prop = "DaysUntilCertificateExpires";

//     Prop = Prop;
//     return SigWebGetProperty(Prop);
//   }

//   //
//   //			SigPlusNETSig.cs
//   //
//   function ClearTablet() {
//     // onSign()
//     var Prop = "ClearSignature";

//     Prop = Prop;
//     return SigWebGetProperty(Prop);
//   }

//   function NumberOfTabletPoints() {
//     var Prop = "TotalPoints";

//     Prop = Prop;
//     return SigWebGetProperty(Prop);
//   }

//   //		function  ExportSigFile(  FileName ) {}
//   //		function  ImportSigFile(  FileName ) {}

//   function SetSigString(sigStr, ctx) {
//     var Prop = "SigString";

//     Prop = Prop;
//     var xhr = SigWebcreateXHR();

//     if (xhr) {
//       xhr.open("POST", baseUri + Prop);
//       xhr.setRequestHeader("Content-Type", "text/plain");
//       xhr.send(sigStr);
//       xhr.onload = function () {
//         if (ctx) {
//           var can = ctx.canvas;
//           SetImageXSize(can.width);
//           SetImageYSize(can.height);
//           GetSigImage(ctx);
//         }
//       };
//     }
//     return "";
//   }

//   function GetSigString() {
//     var Prop = "SigString";

//     Prop = Prop;
//     var Str = SigWebGetProperty(Prop);

//     return Str.slice(1, Str.length - 1);
//   }

//   function SetSigCompressionMode(v) {
//     var Prop = "CompressionMode/";

//     Prop = Prop + v;
//     SigWebSetPropertySync(Prop);
//   }

//   function GetSigCompressionMode() {
//     var Prop = "CompressionMode";

//     Prop = Prop;
//     return SigWebGetProperty(Prop);
//   }

//   function SetEncryptionMode(v) {
//     var Prop = "EncryptionMode/";

//     Prop = Prop + v;
//     SigWebSetPropertySync(Prop);
//   }

//   function GetEncryptionMode() {
//     var Prop = "EncryptionMode";

//     Prop = Prop;
//     return SigWebGetProperty(Prop);
//   }

//   //		function  SetKey( Keydata ) {}
//   //		function  GetKey( ) {}

//   function SetKeyString(keyString) {
//     var Prop = "KeyString";

//     Prop = Prop;
//     SigWebSetStreamProperty(Prop, keyString);
//   }

//   function GetKeyString() {
//     var Prop = "KeyString";

//     Prop = Prop;
//     var Str = SigWebGetProperty(Prop);

//     return Str.slice(1, Str.length - 1);
//   }

//   function AutoKeyStart() {
//     var Prop = "AutoKeyStart";

//     Prop = Prop;
//     SigWebSetPropertySync(Prop);
//   }

//   function AutoKeyFinish() {
//     var Prop = "AutoKeyFinish";

//     Prop = Prop;
//     SigWebSetPropertySync(Prop);
//   }

//   function SetAutoKeyData(keyData) {
//     var Prop = "SetAutoKeyData";

//     Prop = Prop;
//     SigWebSetStreamProperty(Prop, keyData);
//   }

//   function AutoKeyAddData(keyData) {
//     var Prop = "AutoKeyAddData";

//     Prop = Prop;
//     SigWebSetStreamProperty(Prop, keyData);
//     return GetKeyString();
//   }

//   function AutoKeyAddANSIData(keyData) {
//     var Prop = "AutoKeyAddANSIData";

//     Prop = Prop;
//     var isASCII = SigWebSyncSetStreamProperty(Prop, keyData);
//     return isASCII;
//   }

//   //		function  GetKeyReceipt( ) {}

//   function GetKeyReceiptAscii() {
//     var Prop = "KeyReceiptAscii";

//     Prop = Prop;
//     var Str = SigWebGetProperty(Prop);

//     return Str.slice(1, Str.length - 1);
//   }

//   //		function  GetSigReceipt( ) {}

//   function GetSigReceiptAscii() {
//     var Prop = "SigReceiptAscii";

//     Prop = Prop;
//     var Str = SigWebGetProperty(Prop);

//     return Str.slice(1, Str.length - 1);
//   }

//   function SetTimeStamp(timeStamp) {
//     var Prop = "TimeStamp";

//     Prop = Prop;
//     SigWebSetStreamProperty(Prop, timeStamp);
//   }

//   function GetTimeStamp() {
//     var Prop = "TimeStamp";

//     Prop = Prop;
//     var Str = SigWebGetProperty(Prop);

//     return Str.slice(1, Str.length - 1);
//   }

//   function SetAnnotate(annotate) {
//     var Prop = "Annotate";

//     Prop = Prop;
//     SigWebSetStreamProperty(Prop, annotate);
//   }

//   function GetAnnotate() {
//     var Prop = "Annotate";

//     Prop = Prop;
//     var Str = SigWebGetProperty(Prop);

//     return Str.slice(1, Str.length - 1);
//   }

//   function SetSaveSigInfo(v) {
//     var Prop = "SaveSigInfo/";

//     Prop = Prop + v;
//     SigWebSetPropertySync(Prop);
//   }

//   function GetSaveSigInfo() {
//     var Prop = "SaveSigInfo";

//     Prop = Prop;
//     return SigWebGetProperty(Prop);
//   }

//   function SetSavePressureData(v) {
//     var Prop = "SavePressureData/";

//     Prop = Prop + v;
//     SigWebSetPropertySync(Prop);
//   }

//   function GetSavePressureData() {
//     var Prop = "SavePressureData";

//     Prop = Prop;
//     return SigWebGetProperty(Prop);
//   }

//   function SetSaveTimeData(v) {
//     var Prop = "SaveTimeData/";

//     Prop = Prop + v;
//     SigWebSetPropertySync(Prop);
//   }

//   function GetSaveTimeData() {
//     var Prop = "SaveTimeData";

//     Prop = Prop;
//     return SigWebGetProperty(Prop);
//   }

//   function SetAntiAliasSpotSize(v) {
//     var Prop = "AntiAliasSpotSize/";

//     Prop = Prop + v;
//     SigWebSetPropertySync(Prop);
//   }

//   function GetAntiAliasSpotSize() {
//     var Prop = "AntiAliasSpotSize";

//     Prop = Prop;
//     return SigWebGetProperty(Prop);
//   }

//   function SetAntiAliasLineScale(v) {
//     var Prop = "AntiAliasLineScale/";

//     Prop = Prop + v;
//     SigWebSetPropertySync(Prop);
//   }

//   function GetAntiAliasLineScale() {
//     var Prop = "AntiAliasLineScale";

//     Prop = Prop;
//     return SigWebGetProperty(Prop);
//   }

//   function GetNumberOfStrokes() {
//     var Prop = "NumberOfStrokes";

//     Prop = Prop;
//     return SigWebGetProperty(Prop);
//   }

//   function GetNumPointsForStroke(v) {
//     var Prop = "NumberOfPointsInStroke/";

//     Prop = Prop + v;
//     return SigWebGetProperty(Prop);
//   }

//   function GetPointXValue(v1, v2) {
//     var Prop = "PointXValue/";

//     Prop = Prop + v1 + "/" + v2;
//     return SigWebGetProperty(Prop);
//   }

//   function GetPointYValue(v1, v2) {
//     var Prop = "PointYValue/";

//     Prop = Prop + v1 + "/" + v2;
//     return SigWebGetProperty(Prop);
//   }

//   function SetAntiAliasEnable(v) {
//     var Prop = "AntiAliasEnable/";

//     Prop = Prop + v;
//     SigWebSetPropertySync(Prop);
//   }

//   function GetAntiAliasEnable() {
//     var Prop = "AntiAliasEnable";

//     Prop = Prop;
//     return SigWebGetProperty(Prop);
//   }

//   function SetUseAmbientColors(v) {
//     var Prop = "UseAmbientColors/";

//     Prop = Prop + v;
//     SigWebSetPropertySync(Prop);
//   }

//   //
//   //		SigPlusNETDisplay.cs
//   //
//   function SetDisplayXSize(v) {
//     var Prop = "DisplayXSize/";

//     Prop = Prop + v;
//     SigWebSetPropertySync(Prop);
//   }

//   function GetDisplayXSize() {
//     var Prop = "DisplayXSize";

//     Prop = Prop;
//     return SigWebGetProperty(Prop);
//   }

//   function SetDisplayYSize(v) {
//     var Prop = "DisplayYSize/";

//     Prop = Prop + v;
//     SigWebSetPropertySync(Prop);
//   }

//   function GetDisplayYSize() {
//     var Prop = "DisplayYSize";

//     Prop = Prop;
//     return SigWebGetProperty(Prop);
//   }
//   function SetDisplayPenWidth(v) {
//     var Prop = "DisplayPenWidth/";

//     Prop = Prop + v;
//     SigWebSetPropertySync(Prop);
//   }

//   function GetDisplayPenWidth() {
//     var Prop = "DisplayPenWidth";

//     Prop = Prop;
//     return SigWebGetProperty(Prop);
//   }

//   function SetDisplayTimeStamp(v) {
//     var Prop = "DisplayTimeStamp/";

//     Prop = Prop + v;
//     SigWebSetPropertySync(Prop);
//   }

//   function GetDisplayTimeStamp() {
//     var Prop = "DisplayTimeStamp";

//     Prop = Prop;
//     return SigWebGetProperty(Prop);
//   }

//   function SetDisplayTimeStampPosX(v) {
//     var Prop = "DisplayTimeStampPosX/";

//     Prop = Prop + v;
//     SigWebSetPropertySync(Prop);
//   }

//   function GetDisplayTimeStampPosX() {
//     var Prop = "DisplayTimeStampPosX";

//     Prop = Prop;
//     return SigWebGetProperty(Prop);
//   }

//   function SetDisplayTimeStampPosY(v) {
//     var Prop = "DisplayTimeStampPosY/";

//     Prop = Prop + v;
//     SigWebSetPropertySync(Prop);
//   }

//   function GetDisplayTimeStampPosY() {
//     var Prop = "DisplayTimeStampPosY";

//     Prop = Prop;
//     return SigWebGetProperty(Prop);
//   }

//   function SetDisplayTimeStampSize(v) {
//     var Prop = "DisplayTimeStampSize/";

//     Prop = Prop + v;
//     SigWebSetPropertySync(Prop);
//   }

//   function GetDisplayTimeStampSize() {
//     var Prop = "DisplayTimeStampSize";

//     Prop = Prop;
//     return SigWebGetProperty(Prop);
//   }

//   function SetDisplayAnnotate(v) {
//     var Prop = "DisplayAnnotate/";

//     Prop = Prop + v;
//     SigWebSetPropertySync(Prop);
//   }

//   function GetDisplayAnnotate() {
//     var Prop = "DisplayAnnotate";

//     Prop = Prop;
//     return SigWebGetProperty(Prop);
//   }

//   function SetDisplayAnnotatePosX(v) {
//     var Prop = "DisplayAnnotatePosX/";

//     Prop = Prop + v;
//     SigWebSetPropertySync(Prop);
//   }

//   function GetDisplayAnnotatePosX() {
//     var Prop = "DisplayAnnotatePosX";

//     Prop = Prop;
//     return SigWebGetProperty(Prop);
//   }

//   function SetDisplayAnnotatePosY(v) {
//     var Prop = "DisplayAnnotatePosY/";

//     Prop = Prop + v;
//     SigWebSetPropertySync(Prop);
//   }

//   function GetDisplayAnnotatePosY() {
//     var Prop = "DisplayAnnotatePosY";

//     Prop = Prop;
//     return SigWebGetProperty(Prop);
//   }

//   function SetDisplayAnnotateSize(v) {
//     var Prop = "DisplayAnnotateSize/";

//     Prop = Prop + v;
//     SigWebSetPropertySync(Prop);
//   }

//   function GetDisplayAnnotateSize() {
//     var Prop = "DisplayAnnotateSize";

//     Prop = Prop;
//     return SigWebGetProperty(Prop);
//   }

//   //
//   //		SigPlusNETImage.cs
//   //
//   //		function  GetSigImageB64( )
//   //			{
//   //			var xhr2 = new XMLHttpRequest();
//   //			xhr2.open("GET", baseUri + "SigImage/1", false );
//   //			xhr2.responseType = "blob"
//   //			xhr2.send(null);
//   //			if (xhr2.readyState == 4 && xhr.status == 200)
//   //				{
//   //				return window.URL.createObjectURL(xhr2.response);
//   //				}
//   //			return null;
//   //			}

//   function SetImageXSize(v) {
//     var Prop = "ImageXSize/";

//     Prop = Prop + v;
//     SigWebSetPropertySync(Prop);
//   }

//   function GetImageXSize() {
//     var Prop = "ImageXSize";

//     Prop = Prop;
//     return SigWebGetProperty(Prop);
//   }

//   function SetImageYSize(v) {
//     var Prop = "ImageYSize/";

//     Prop = Prop + v;
//     SigWebSetPropertySync(Prop);
//   }

//   function GetImageYSize() {
//     var Prop = "ImageYSize";

//     Prop = Prop;
//     return SigWebGetProperty(Prop);
//   }

//   function SetImagePenWidth(v) {
//     var Prop = "ImagePenWidth/";

//     Prop = Prop + v;
//     SigWebSetPropertySync(Prop);
//   }

//   function GetImagePenWidth() {
//     var Prop = "ImagePenWidth";

//     Prop = Prop;
//     return SigWebGetProperty(Prop);
//   }

//   function SetImageTimeStamp(v) {
//     var Prop = "ImageTimeStamp/";

//     Prop = Prop + v;
//     SigWebSetPropertySync(Prop);
//   }

//   function GetImageTimeStamp() {
//     var Prop = "ImageTimeStamp";

//     Prop = Prop;
//     return SigWebGetProperty(Prop);
//   }

//   function SetImageTimeStampPosX(v) {
//     var Prop = "ImageTimeStampPosX/";

//     Prop = Prop + v;
//     SigWebSetPropertySync(Prop);
//   }

//   function GetImageTimeStampPosX() {
//     var Prop = "ImageTimeStampPosX";

//     Prop = Prop;
//     return SigWebGetProperty(Prop);
//   }

//   function SetImageTimeStampPosY(v) {
//     var Prop = "ImageTimeStampPosY/";

//     Prop = Prop + v;
//     SigWebSetPropertySync(Prop);
//   }

//   function GetImageTimeStampPosY() {
//     var Prop = "ImageTimeStampPosY";

//     Prop = Prop;
//     return SigWebGetProperty(Prop);
//   }

//   function SetImageTimeStampSize(v) {
//     var Prop = "ImageTimeStampSize/";

//     Prop = Prop + v;
//     SigWebSetPropertySync(Prop);
//   }

//   function GetImageTimeStampSize() {
//     var Prop = "ImageTimeStampSize";

//     Prop = Prop;
//     return SigWebGetProperty(Prop);
//   }

//   function SetImageAnnotate(v) {
//     var Prop = "ImageAnnotate/";

//     Prop = Prop + v;
//     SigWebSetPropertySync(Prop);
//   }

//   function GetImageAnnotate() {
//     var Prop = "ImageAnnotate";

//     Prop = Prop;
//     return SigWebGetProperty(Prop);
//   }

//   function SetImageAnnotatePosX(v) {
//     var Prop = "ImageAnnotatePosX/";

//     Prop = Prop + v;
//     SigWebSetPropertySync(Prop);
//   }

//   function GetImageAnnotatePosX() {
//     var Prop = "ImageAnnotatePosX";

//     Prop = Prop;
//     return SigWebGetProperty(Prop);
//   }

//   function SetImageAnnotatePosY(v) {
//     var Prop = "ImageAnnotatePosY/";

//     Prop = Prop + v;
//     SigWebSetPropertySync(Prop);
//   }

//   function GetImageAnnotatePosY() {
//     var Prop = "ImageAnnotatePosY";

//     Prop = Prop;
//     return SigWebGetProperty(Prop);
//   }

//   function SetImageAnnotateSize(v) {
//     var Prop = "ImageAnnotateSize/";

//     Prop = Prop + v;
//     SigWebSetPropertySync(Prop);
//   }

//   function GetImageAnnotateSize() {
//     var Prop = "ImageAnnotateSize";

//     Prop = Prop;
//     return SigWebGetProperty(Prop);
//   }

//   function SetJustifyX(v) {
//     var Prop = "JustifyX/";

//     Prop = Prop + v;
//     SigWebSetPropertySync(Prop);
//   }

//   function GetJustifyX() {
//     var Prop = "JustifyX";

//     Prop = Prop;
//     return SigWebGetProperty(Prop);
//   }

//   function SetJustifyY(v) {
//     var Prop = "JustifyY/";

//     Prop = Prop + v;
//     SigWebSetPropertySync(Prop);
//   }

//   function GetJustifyY() {
//     var Prop = "JustifyY";

//     Prop = Prop;
//     return SigWebGetProperty(Prop);
//   }

//   function SetJustifyMode(v) {
//     var Prop = "JustifyMode/";

//     Prop = Prop + v;
//     SigWebSetPropertySync(Prop);
//   }

//   function GetJustifyMode() {
//     var Prop = "JustifyMode";

//     Prop = Prop;
//     return SigWebGetProperty(Prop);
//   }

//   //
//   //		SigPlusNETKeyPad.cs
//   //
//   function KeyPadAddHotSpot(key, coord, xp, yp, xs, ys) {
//     var Prop = "KeyPadAddHotSpot/";
//     Prop = Prop + key + "," + coord + "," + xp + "," + yp + "," + xs + "," + ys;
//     SigWebSetPropertySync(Prop);
//   }

//   function KeyPadMarkHotSpot(key, coord, xp, yp, xs, ys) {
//     LCDWriteString(0, 2, xp, yp, "16pt sans-serif", 32, "+");
//     LCDWriteString(0, 2, xp + xs, yp, "16pt sans-serif", 32, "+");
//     LCDWriteString(0, 2, xp, yp + ys, "16pt sans-serif", 32, "+");
//     LCDWriteString(0, 2, xp + xs, yp + ys, "16pt sans-serif", 32, "+");
//   }

//   function KeyPadQueryHotSpot(key) {
//     var Prop = "KeyPadQueryHotSpot/";
//     Prop = Prop + key;
//     return SigWebGetProperty(Prop);
//   }

//   function KeyPadClearHotSpotList() {
//     var Prop = "KeyPadClearHotSpotList";
//     SigWebSetPropertySync(Prop);
//   }

//   function SetSigWindow(coords, xp, yp, xs, ys) {
//     var Prop = "SigWindow/";

//     Prop = Prop + coords + "," + xp + "," + yp + "," + xs + "," + ys;
//     SigWebSetPropertySync(Prop);
//   }

//   function ClearSigWindow(inside) {
//     var Prop = "ClearSigWindow/";
//     Prop = Prop + inside;
//     SigWebSetPropertySync(Prop);
//   }
//   //
//   //		SigPlusNETLCD.cs
//   //
//   function SetLCDCaptureMode(v) {
//     var Prop = "CaptureMode/";

//     Prop = Prop + v;
//     SigWebSetPropertySync(Prop);
//   }

//   function GetLCDCaptureMode() {
//     var Prop = "CaptureMode";

//     Prop = Prop;
//     return SigWebGetProperty(Prop);
//   }

//   function LCDSetWindow(xP, yP, xS, yS) {
//     var Prop = "LCDSetWindow/";
//     Prop = Prop + xP + "," + yP + "," + xS + "," + yS;
//     SigWebSetPropertySync(Prop);
//   }

//   function LCDWriteString(dest, mode, x, y, fnt, size, str) {
//     var c = document.createElement("canvas");
//     var cntx = c.getContext("2d");
//     cntx.font = fnt;
//     var txt = str;
//     var xs = Math.round(cntx.measureText(txt).width);
//     var ys = size;
//     c.width = xs;
//     c.height = ys;

//     if (xs == 0) {
//       return;
//     }

//     cntx.font = fnt;
//     cntx.fillStyle = "#FFFFFF";
//     cntx.rect(0, 0, xs, ys);
//     cntx.fill();

//     cntx.fillStyle = "#000000";
//     cntx.textBaseline = "top";
//     cntx.fillText(txt, 0, 0);

//     cntx.drawImage(cntx.canvas, 0, 0, xs, ys);

//     var Gstr = createLcdBitmapFromCanvas(c, x, y, xs, ys);

//     LcdWriteImageStream(dest, mode, x, y, xs, ys, Gstr);
//   }

//   function LCDDrawRectangle(dest, mode, x, y, xs, ys, fill) {
//     var c = document.createElement("canvas");
//     var cntx = c.getContext("2d");

//     c.width = xs;
//     c.height = ys;

//     cntx.fillStyle = fill;
//     cntx.rect(0, 0, xs, ys);
//     cntx.fill();

//     cntx.drawImage(cntx.canvas, 0, 0, xs, ys);
//     var Gstr = createLcdBitmapFromCanvas(c, x, y, xs, ys);
//     LcdWriteImageBlob(dest, mode, x, y, xs, ys, Gstr);
//   }

//   function LCDDrawButton(dest, mode, x, y, xs, ys, strys, fill, fnt, str) {
//     var c = document.createElement("canvas");
//     var cntx = c.getContext("2d");
//     cntx.font = fnt;
//     var txt = str;
//     var sxs = Math.round(cntx.measureText(txt).width);
//     var sys = strys;
//     c.width = xs;
//     c.height = ys;

//     cntx.font = fnt;
//     cntx.fillStyle = fill;
//     cntx.rect(0, 0, xs, ys);
//     cntx.fill();

//     cntx.fillStyle = "#FFFFFF";
//     cntx.textBaseline = "top";
//     cntx.fillText(txt, (xs - sxs) / 2, (ys - sys) / 2);

//     cntx.drawImage(cntx.canvas, 0, 0, xs, ys);

//     var Gstr = createLcdBitmapFromCanvas(c, x, y, xs, ys);

//     LcdWriteImageBlob(dest, mode, x, y, xs, ys, Gstr);
//   }

//   function LCDWriteStringWindow(dest, mode, x, y, fnt, xsize, ysize, str) {
//     var c = document.createElement("canvas");
//     var cntx = c.getContext("2d");
//     cntx.font = fnt;
//     var txt = str;
//     var xs = xsize;
//     var ys = ysize;
//     c.width = xs;
//     c.height = ys;

//     cntx.font = fnt;
//     cntx.fillStyle = "#FFFFFF";
//     cntx.rect(0, 0, xs, ys);
//     cntx.fill();

//     cntx.fillStyle = "#000000";
//     cntx.textBaseline = "top";
//     cntx.fillText(txt, 0, 0);

//     cntx.drawImage(cntx.canvas, 0, 0, xs, ys);

//     var Gstr = createLcdBitmapFromCanvas(c, x, y, xs, ys);

//     LcdWriteImageBlob(dest, mode, x, y, xs, ys, Gstr);
//   }

//   function LCDStringWidth(fnt, str) {
//     var c = document.createElement("canvas");
//     var cntx = c.getContext("2d");
//     cntx.font = fnt;
//     var txt = str;
//     var xs = Math.round(cntx.measureText(txt).width);

//     return xs;
//   }

//   function LCDStringHeight(fnt, str) {
//     return 16;
//   }

//   function LcdRefresh(Mode, Xp, Yp, Xs, Ys) {
//     var Prop = "LcdRefresh/";

//     Prop = Prop + Mode + "," + Xp + "," + Yp + "," + Xs + "," + Ys;
//     SigWebSetPropertySync(Prop);
//   }

//   function LCDSendCmdString(CmdStr, ReturnCount, Result, TimeOut) {
//     var Prop = "LcdSendCmdString/";

//     Prop = Prop + ReturnCount + "," + TimeOut;
//     Result = SigWebSetStreamProperty(Prop, CmdStr);
//   }

//   function LCDSendCmdData(CmdStr, ReturnCount, Result, TimeOut) {
//     var Prop = "LcdSendCmdData/";

//     Prop = Prop + ReturnCount + "," + TimeOut;
//     Result = SigWebSetStreamProperty(Prop, CmdStr);
//   }

//   // function LCDSendGraphicCanvas(dest, mode, x, y, canvas) {
//   // 	var Gstr = createLcdBitmapFromCanvas(canvas, 0, 0, xs, ys)
//   // 	LcdWriteImageStream(dest, mode, x, y, canvas.width, canvas.height, Gstr);
//   // }

//   //		function  LCDSendWindowedGraphicCanvas(  dest, mode,  x,  y, canvas )
//   //			 {
//   //			 }

//   //		function  LCDSendWindowedGraphicCanvas(  dest, mode,  x,  y,  xs,  ys, canvas )
//   //			{
//   //			var Gstr = createLcdBitmapFromCanvas( canvas, 0, 0, xs, ys)
//   //			LcdWriteImageStream( dest, mode, x, y, xs, ys, Gstr );
//   //			}

//   function LCDSendGraphicCanvas(dest, mode, x, y, canvas, xs, ys) {
//     var Gstr = createLcdBitmapFromCanvas(canvas, 0, 0, xs, ys);
//     LcdWriteImageStream(dest, mode, x, y, canvas.width, canvas.height, Gstr);
//   }

//   // function LCDSendWindowedGraphicCanvas(dest, mode, x, y, xs, ys, c, xps, yps) {
//   // 	var Gstr = createLcdBitmapFromCanvas(canvas, xps, yps, xs, ys)
//   // 	LcdWriteImageStream(dest, mode, x, y, xs, ys, Gstr);
//   // }

//   function LCDSendWindowedGraphicCanvas(
//     dest,
//     mode,
//     x,
//     y,
//     xs,
//     ys,
//     canvas,
//     xps,
//     yps
//   ) {
//     var Gstr = createLcdBitmapFromCanvas(canvas, xps, yps, xs, ys);
//     LcdWriteImageStream(dest, mode, x, y, xs, ys, Gstr);
//   }

//   function LCDSendGraphicUrl(dest, mode, x, y, url) {
//     LcdWriteImage(dest, mode, x, y, url);
//   }

//   //		function  LCDSendWindowedGraphicUrl(  dest, mode,  X,  Y, url )
//   //			{
//   //			}

//   //		function  LCDSendWindowedGraphicUrl(  dest, mode,  x,  y,  xs,  ys, url )
//   //			{
//   //			LcdWriteImageStream(dest, mode, x, y, xs, ys, url);
//   //			}

//   // function LCDSendWindowedGraphicUrl(dest, mode, x, y, xse, yse, url, xps, yps) {
//   // 	LcdWriteImageStream(dest, mode, x, y, xs, ys, url);
//   // }

//   function LCDSendWindowedGraphicUrl(dest, mode, x, y, xs, ys, url, xps, yps) {
//     LcdWriteImageStream(dest, mode, x, y, xs, ys, url);
//   }

//   //		function  LCDSendGraphic(  Dest,  Mode,  XPos,  YPos,  ImageFileName ) {}
//   //		function  LCDSendGraphicURL(  Dest,  Mode,  XPos,  YPos,  URL ) {}

//   function LCDClear() {
//     var Prop = "LcdClear";

//     Prop = Prop;
//     return SigWebGetProperty(Prop);
//   }

//   function LCDSetTabletMap(
//     LCDType,
//     LCDXSize,
//     LCDYSize,
//     LCDXStart,
//     LCDYStart,
//     LCDXStop,
//     LCDYStop
//   ) {}

//   function LCDSetPixelDepth(v) {
//     var Prop = "LcdSetPixelDepth/";

//     Prop = Prop + v;
//     SigWebSetPropertySync(Prop);
//   }

//   function LCDGetLCDSize() {
//     var Prop = "LcdGetLcdSize";

//     Prop = Prop;
//     return SigWebGetProperty(Prop);
//   }

//   // function LCDSetCompressionMode(NewMode) {
//   // 	var Prop = "LcdCompressionMode/";

//   // 	Prop = Prop + v;
//   // 	SigWebSetPropertySync(Prop);
//   // }

//   function LCDSetCompressionMode(NewMode) {
//     var Prop = "LcdCompressionMode/";

//     Prop = Prop + NewMode; // Use NewMode instead of undefined variable v
//     SigWebSetPropertySync(Prop);
//   }

//   // function LCDGetCompressionMode() {
//   // 	var Prop = "LcdCompressionMode";

//   // 	Prop = Prop;
//   // 	return SigWebGetProperty(Prop);
//   // }

//   // function LCDSetZCompressionMode(NewMode) {
//   // 	var Prop = "LcdZCompressionMode/";

//   // 	Prop = Prop + v;
//   // 	SigWebSetPropertySync(Prop);
//   // }

//   function LCDGetZCompressionMode() {
//     var Prop = "LcdZCompressionMode";

//     Prop = Prop;
//     return SigWebGetProperty(Prop);
//   }
//   //
//   //		SigPlusNETLCD.cs
//   //

//   function SetRealTabletState(v) {
//     var Prop = "TabletState/";

//     Prop = Prop + v;
//     SigWebSetPropertySync(Prop);
//   }

//   function GetTabletState() {
//     var Prop = "TabletState";

//     Prop = Prop;
//     return SigWebGetProperty(Prop);
//   }

//   function SetTabletLogicalXSize(v) {
//     var Prop = "TabletLogicalXSize/";

//     Prop = Prop + v;
//     SigWebSetPropertySync(Prop);
//   }

//   function GetTabletLogicalXSize() {
//     var Prop = "TabletLogicalXSize";

//     Prop = Prop;
//     return SigWebGetProperty(Prop);
//   }

//   function GetTabletLogicalYSize() {
//     var Prop = "TabletLogicalYSize";

//     Prop = Prop;
//     return SigWebGetProperty(Prop);
//   }

//   function SetTabletLogicalYSize(v) {
//     var Prop = "TabletLogicalYSize/";

//     Prop = Prop + v;
//     SigWebSetPropertySync(Prop);
//   }

//   function SetTabletXStart(v) {
//     var Prop = "TabletXStart/";

//     Prop = Prop + v;
//     SigWebSetPropertySync(Prop);
//   }

//   function GetTabletXStart() {
//     var Prop = "TabletXStart";

//     Prop = Prop;
//     return SigWebGetProperty(Prop);
//   }

//   function SetTabletYStart(v) {
//     var Prop = "TabletYStart/";

//     Prop = Prop + v;
//     SigWebSetPropertySync(Prop);
//   }

//   function GetTabletYStart() {
//     var Prop = "TabletYStart";

//     Prop = Prop;
//     return SigWebGetProperty(Prop);
//   }

//   function SetTabletXStop(v) {
//     var Prop = "TabletXStop/";

//     Prop = Prop + v;
//     SigWebSetPropertySync(Prop);
//   }

//   function GetTabletXStop() {
//     var Prop = "TabletXStop";

//     Prop = Prop;
//     return SigWebGetProperty(Prop);
//   }

//   function SetTabletYStop(v) {
//     var Prop = "TabletYStop/";

//     Prop = Prop + v;
//     SigWebSetPropertySync(Prop);
//   }

//   function GetTabletYStop() {
//     var Prop = "TabletYStop";

//     Prop = Prop;
//     return SigWebGetProperty(Prop);
//   }

//   function SetTabletFilterPoints(v) {
//     var Prop = "TabletFilterPoints/";

//     Prop = Prop + v;
//     SigWebSetPropertySync(Prop);
//   }

//   function GetTabletFilterPoints() {
//     var Prop = "TabletFilterPoints";

//     Prop = Prop;
//     return SigWebGetProperty(Prop);
//   }

//   function SetTabletTimingAdvance(v) {
//     var Prop = "TabletTimingAdvance/";

//     Prop = Prop + v;
//     SigWebSetPropertySync(Prop);
//   }

//   function GetTabletTimingAdvance() {
//     var Prop = "TabletTimingAdvance";

//     Prop = Prop;
//     return SigWebGetProperty(Prop);
//   }

//   function SetTabletComPort(v) {
//     var Prop = "TabletComPort/";

//     Prop = Prop + v;
//     SigWebSetPropertySync(Prop);
//   }

//   function GetTabletComPort() {
//     var Prop = "TabletComPort";

//     Prop = Prop;
//     return SigWebGetProperty(Prop);
//   }

//   function SetTabletBaudRate(v) {
//     var Prop = "TabletBaudRate/";

//     Prop = Prop + v;
//     SigWebSetPropertySync(Prop);
//   }

//   function GetTabletBaudRate() {
//     var Prop = "TabletBaudRate";

//     Prop = Prop;
//     return SigWebGetProperty(Prop);
//   }

//   function SetTabletRotation(v) {
//     var Prop = "TabletRotation/";

//     Prop = Prop + v;
//     SigWebSetPropertySync(Prop);
//   }

//   function GetTabletRotation() {
//     var Prop = "TabletRotation";

//     Prop = Prop;
//     return SigWebGetProperty(Prop);
//   }

//   function SetTabletType(v) {
//     var Prop = "TabletType/";

//     Prop = Prop + v;
//     SigWebSetPropertySync(Prop);
//   }

//   function GetTabletType() {
//     var Prop = "TabletType";

//     Prop = Prop;
//     return SigWebGetProperty(Prop);
//   }

//   function SetServerTabletType(v) {
//     var Prop = "ServerTabletType/";

//     Prop = Prop + v;
//     SigWebSetPropertySync(Prop);
//   }

//   function GetServerTabletType() {
//     var Prop = "ServerTabletType";

//     Prop = Prop;
//     return SigWebGetProperty(Prop);
//   }

//   function SetTabletComTest(v) {
//     var Prop = "TabletComTest/";

//     Prop = Prop + v;
//     SigWebSetPropertySync(Prop);
//   }

//   function GetTabletComTest() {
//     var Prop = "TabletComTest";

//     Prop = Prop;
//     return SigWebGetProperty(Prop);
//   }

//   function SetTabletResolution(v) {
//     var Prop = "TabletResolution/";

//     Prop = Prop + v;
//     SigWebSetPropertySync(Prop);
//   }

//   function GetTabletResolution() {
//     var Prop = "TabletResolution";

//     Prop = Prop;
//     return SigWebGetProperty(Prop);
//   }

//   function TabletConnectQuery() {
//     var Prop = "TabletConnectQuery";

//     Prop = Prop;
//     return SigWebGetProperty(Prop);
//   }

//   function TabletModelNumber() {
//     var Prop = "TabletModelNumber";

//     Prop = Prop;
//     return SigWebGetProperty(Prop);
//   }

//   function TabletSerialNumber() {
//     var Prop = "TabletSerialNumber";

//     Prop = Prop;
//     return SigWebGetProperty(Prop);
//   }

//   function SetTabletPortPath(v) {
//     var Prop = "TabletPortPath/";

//     Prop = Prop + v;
//     SigWebSetPropertySync(Prop);
//   }

//   function SetTabletLocalIniFilePath(v) {
//     var Prop = "TabletLocalIniFilePath/";

//     Prop = Prop + v;
//     SigWebSetPropertySync(Prop);
//   }

//   function SetTabletModel(v) {
//     var Prop = "TabletModel/";

//     Prop = Prop + v;
//     SigWebSetPropertySync(Prop);
//   }

//   function SetSerialPortCloseDelay(v) {
//     var Prop = "SerialPortCloseDelay/";

//     Prop = Prop + v;
//     SigWebSetPropertySync(Prop);
//   }

//   function GetSerialPortCloseDelay() {
//     var Prop = "SerialPortCloseDelay";

//     Prop = Prop;
//     return SigWebGetProperty(Prop);
//   }

//   function EnableTabletEncryption() {
//     var Prop = "EnableTabletEncryption";

//     Prop = Prop;
//     SigWebSetPropertySync(Prop);
//   }

//   function SetTabletEncryptionMode(hmode, tmode) {
//     var Prop = "TabletEncryptionMode/";

//     Prop = Prop + hmode + "," + tmode;
//     SigWebSetPropertySync(Prop);
//   }

//   function SetMaxLogFileSize(v) {
//     var Prop = "MaxLogFileSize/";

//     Prop = Prop + v;
//     SigWebSetPropertySync(Prop);
//   }

//   function GetSigSockServerPath() {
//     var Prop = "SigSockServerPath";

//     Prop = Prop;
//     return SigWebGetProperty(Prop);
//   }

//   function GetSigSockClientName() {
//     var Prop = "SigSockClientName";

//     Prop = Prop;
//     return SigWebGetProperty(Prop);
//   }

//   function GetSigSockPortNumber() {
//     var Prop = "SigSockPortNumber";

//     Prop = Prop;
//     return SigWebGetProperty(Prop);
//   }

//   function SetSigSockServerPath(v) {
//     var Prop = "SigSockServerPath/";

//     Prop = Prop + v;
//     SigWebSetPropertySync(Prop);
//   }

//   function SetSigSockClientName(v) {
//     var Prop = "SigSockClientName/";

//     Prop = Prop + v;
//     SigWebSetPropertySync(Prop);
//   }

//   function SetPortNumber(v) {
//     var Prop = "PortNumber/";

//     Prop = Prop + v;
//     SigWebSetPropertySync(Prop);
//   }

//   function SetSigSockPortNumber(v) {
//     var Prop = "SigSockPortNumber/";

//     Prop = Prop + v;
//     SigWebSetPropertySync(Prop);
//   }

//   function GetFirmwareRevision() {
//     var Prop = "FirmwareRevision";

//     Prop = Prop;
//     return SigWebGetProperty(Prop);
//   }

//   function SetTabletData(sigStr) {
//     var Prop = "TabletData";

//     Prop = Prop;
//     SigWebSetStreamProperty(Prop, sigStr);
//   }

//   function GetTabletData() {
//     var Prop = "TabletData";

//     Prop = Prop;
//     var Str = SigWebGetProperty(Prop);

//     return Str.slice(1, Str.length - 1);
//   }

//   function OpenTablet(v) {
//     var Prop = "OpenTablet/";

//     Prop = Prop + v;
//     SigWebSetPropertySync(Prop);
//   }

//   function CloseTablet() {
//     var Prop = "CloseTablet";

//     Prop = Prop;
//     SigWebSetProperty(Prop);
//   }

//   function ResetParameters() {
//     var Prop = "ResetParameters";

//     Prop = Prop;
//     SigWebSetPropertySync(Prop);
//   }

//   function testRawData() {
//     OpenTablet(1);
//     var Str1 = GetTabletData();
//     CloseTablet();
//   }

//   function Reset() {
//     var Prop = "Reset";
//     SigWebSetProperty(Prop);
//   }

//   function SetTabletState(v, ctx, tv) {
//     var delay;

//     if (tv) {
//       delay = tv;
//     } else {
//       delay = 100;
//     }

//     if (GetTabletState() != v) {
//       if (v == 1) {
//         if (ctx) {
//           var can = ctx.canvas;
//           SetDisplayXSize(can.width);
//           SetDisplayYSize(can.height);
//           SigWebSetDisplayTarget(ctx);
//         }
//         SetRealTabletState(v);
//         if (ctx && GetTabletState() != 0) {
//           var tmr = setInterval(SigWebRefresh, delay);
//         } else {
//           var tmr = null;
//         }

//         return tmr;
//       } else {
//         if (ctx) {
//           clearInterval(ctx);
//         }
//         SigWebSetDisplayTarget(null);
//         SetRealTabletState(v);
//       }
//     }
//     return null;
//   }

//   /**
//    * Created by Bradley Brandon on 9/4/19.
//    */
//   var tmr;

//   window.onunload = window.onbeforeunload = function () {
//     closingSigWeb();
//   };

//   function closingSigWeb() {
//     ClearTablet();
//     SetTabletState(0, tmr);
//   }

//   useEffect(() => {
//     GetSigImageB64(SigImageCallback);
//   }, [check]);
//   // function onSign() {

//   //   var ctx = document.getElementById("cnv").getContext("2d");
//   //   SetDisplayXSize(500);
//   //   SetDisplayYSize(100);
//   //   SetTabletState(0, tmr);
//   //   SetJustifyMode(0);
//   //   ClearTablet();
//   //   if (tmr == null) {
//   //     tmr = SetTabletState(1, ctx, 50);
//   //   } else {
//   //     SetTabletState(0, tmr);
//   //     tmr = null;
//   //     tmr = SetTabletState(1, ctx, 50);
//   //   }
//   // }

//   function onSign() {
//     var canvas = document.getElementById("cnv");

//     if (canvas) {
//       var ctx = canvas?.getContext("2d");
//       SetDisplayXSize(500);
//       SetDisplayYSize(100);
//       SetTabletState(0, tmr);
//       SetJustifyMode(0);
//       ClearTablet();
//       if (tmr == null) {
//         tmr = SetTabletState(1, ctx, 50);

//         // Display a prompt to the user
//         Swal.fire({
//           timer: 2000,
//           title: "You can sign now",
//           icon: "info",
//           // confirmButtonText: "OK",
//         });
//       } else {
//         SetTabletState(0, tmr);
//         tmr = null;
//         tmr = SetTabletState(1, ctx, 50);
//       }
//     } else {
//       //   Swal.fire({
//       //     icon: "error",
//       //     title: "Error",
//       //     text: "Canvas element with ID 'cnv' not found.",
//       //   });
//     }
//   }

//   function onClear() {
//     setBase64String("");
//     setRefresh(!refresh);
//     ClearTablet();
//   }

//   // function onDone() {
//   //     // Ensure that the necessary elements are available
//   //     var fileInput = document.getElementById("imageInput");
//   //     var capturedImageCanvas = document.getElementById("cnv");

//   //     if (!fileInput || !capturedImageCanvas) {
//   //         alert("File input or captured image canvas not found");
//   //         return;
//   //     }

//   //     // Ensure that the necessary form fields are available
//   //     var bioSigDataField = document.getElementById("bioSigData");
//   //     var sigStringDataField = document.getElementById("sigStringData");
//   //     var capturedImageDataField = document.getElementById("capturedImageData");
//   //     var scannedFileDataField = document.getElementById("scannedFileData");

//   //     if (!bioSigDataField || !sigStringDataField || !capturedImageDataField || !scannedFileDataField) {
//   //         alert("One or more form fields are missing");
//   //         return;
//   //     }

//   //     var tabletPoints = NumberOfTabletPoints();
//   //     var capturedImageBase64 = capturedImageCanvas.toDataURL("image/png");

//   //     if (tabletPoints === 0 && !capturedImageBase64) {
//   //         alert("Please sign or choose a file before continuing");
//   //         return;
//   //     }

//   //     SetTabletState(0, tmr);
//   //     SetSigCompressionMode(1);
//   //     bioSigDataField.value = GetSigString();
//   //     sigStringDataField.value += GetSigString();

//   //     // Assign captured image to a form field
//   //     capturedImageDataField.value = capturedImageBase64;

//   //     if (fileInput.files && fileInput.files[0]) {
//   //         var reader = new FileReader();
//   //         reader.onload = function (e) {
//   //             var scannedFileBase64 = e.target.result;
//   //             scannedFileDataField.value = scannedFileBase64;
//   //         };
//   //         reader.readAsDataURL(fileInput.files[0]);
//   //     }

//   //     SetImageXSize(500);
//   //     SetImageYSize(100);
//   //     SetImagePenWidth(5);
//   //     GetSigImageB64(SigImageCallback);
//   // }

//   function onDone() {
//     console.log("NumberOfTabletPoints:::", NumberOfTabletPoints());
//     if (NumberOfTabletPoints() == 0 && !base64String) {
//       alert("Please sign before continuing");
//     } else {
//       SetTabletState(0, tmr);
//       //RETURN TOPAZ-FORMAT SIGSTRING
//       SetSigCompressionMode(1);
//       if (document.sigForm) {
//         document.sigForm.bioSigData.value = GetSigString();
//         document.sigForm.sigStringData.value += GetSigString();
//       }
//       //this returns the signature in Topaz's own format, with biometric information

//       //RETURN BMP BYTE ARRAY CONVERTED TO BASE64 STRING
//       SetImageXSize(500);
//       SetImageYSize(100);
//       SetImagePenWidth(5);
//       setCheck(!check);

//       // console.log("base64:::", SigImageCallback)
//     }
//   }

//   function SigImageCallback(str) {
//     // if(document.sigForm){
//     // document.sigForm.sigImageData.value = str;
//     setSigImageData(str);
//     // }
//   }

//   ///////////////////////////////////////////////////////////////////////////////////////////
//   ///////////////////////////////////////////////////////////////////////////////////////////
//   ///////////////////////////////////////////////////////////////////////////////////////////

//   const [base64String, setBase64String] = useState("");
//   const [relationNo, setRelationNo] = useState(id);
//   // const [relationNo, setRelationNo] = useState("202302024071");
//   const [pic, setPic] = useState("");
//   const [signature, setSignature] = useState("");
//   const [Imagbase64String, setImageBase64String] = useState("");
//   const canvasRef = useRef(null);

//   const handleFileChange = (event, canvasId, imageId) => {
//     const file = event.target.files[0];

//     if (file) {
//       const reader = new FileReader();

//       reader.onloadend = () => {
//         const base64String = reader.result;
//         setBase64String(base64String);

//         // Call the handleImageCapture function passing the canvasId and imageId
//         handleImageCapture(event, canvasId, imageId);
//       };

//       reader.readAsDataURL(file);
//     }
//   };

//   const handleFileChangeImage = (event) => {
//     const canvas = canvasRef.current;

//     if (event.target.files.length > 0) {
//       const file = event.target.files[0];

//       const reader = new FileReader();
//       reader.onload = function (e) {
//         const base64String = e.target.result;

//         setImageBase64String(base64String);
//         console.log("Image", base64String)

//         // const ctx = canvas.getContext("2d");
//         // const img = new Image();
//         // img.onload = function () {
//         //   ctx.clearRect(0, 0, canvas.width, canvas.height);
//         //   ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
//         // };
//         // img.src = base64String;
//       };

//       reader.readAsDataURL(file);
//     }
//   };

//   //   const handleSubmit = async () => {
//   //     try {
//   //       const data = {
//   //         relation_no: relationNo,
//   //         pic: base64String,
//   //         signature: sigImageData
//   //       };

//   // 	  console.log("image and signature with Data ::: =", data)

//   //       const response = await axios.post('http://10.203.14.169/imaging_sig_api/api/capture.php', data, {
//   //         headers: {
//   //           'Content-Type': 'application/json'
//   //         }
//   //       });

//   //       console.log("image and signature ::: =",JSON.stringify(response.data));
//   //     } catch (error) {
//   //       console.error(error);
//   //     }
//   //   };

//   // useEffect(() => {
//   //     // Call the function to get signature image in base64
//   //     GetSigImageB64((signatureBase64) => {
//   //       // Update the state with the fetched signature
//   //       setSigImageData(signatureBase64);
//   //     });
//   // }, []);

//   const [isSignatureMode, setSignatureMode] = useState(true);

//   const handleToggleMode = () => {
//     setSignatureMode(!isSignatureMode);

//     // Signature function on the signature button
//     // const canvas = document.getElementById("cnv");
//     // if (canvas) {
//     //   const ctx = canvas.getContext("2d");
//     //   SetDisplayXSize(500);
//     //   SetDisplayYSize(100);
//     //   SetTabletState(0, tmr);
//     //   SetJustifyMode(0);
//     //   ClearTablet();
//     //   if (tmr == null) {
//     //     tmr = SetTabletState(1, ctx, 50);
//     //   } else {
//     //     SetTabletState(0, tmr);
//     //     tmr = null;
//     //     tmr = SetTabletState(1, ctx, 50);
//     //   }
//     // } else {
//     //   Swal.fire({
//     //     icon: 'error',
//     //     title: 'Error',
//     //     text: "Canvas element with ID 'cnv' not found.",
//     //   });
//     // }
//   };

//   // useEffect(() => {
//   //     // Call the function to get the signature image in base64
//   //   GetSigImageB64((signatureBase64) => {
//   //     // Update the state with the fetched signature
//   //     setSigImageData(signatureBase64);
//   //   });
//   // }, []);

//   // const handleSubmit = async () => {
//   //   try {
//   //     onDone();
//   //     let base64;
//   //     // GetSigImageB64((signatureBase64) => {
//   //     //   console.log(signatureBase64 , "jaj")
//   //     //   base64 = signatureBase64;
//   //     // }
//   //     // )

//   //     const data = {
//   //       relation_no: relationNo,
//   //       pic: Imagbase64String,
//   //       // signature: base64
//   //       signature: sigImageData,
//   //     };

//   //     console.log(
//   //       "image and signature with Data ::: =",
//   //       data,
//   //       GetSigImageB64((signatureBase64) => {
//   //         // console.log(signatureBase64 , "jaj")
//   //         // base64 = signatureBase64;
//   //         return signatureBase64;
//   //       })
//   //     );
//   //     return;
//   //     const response = await axios.post(
//   //       "http://10.203.14.169/imaging_sig_api/api/capture.php",
//   //       data,
//   //       {
//   //         headers: {
//   //           "Content-Type": "application/json",
//   //         },
//   //       }
//   //     );

//   //     console.log("image and signature ::: =", JSON.stringify(response.data));

//   //     Swal.fire({
//   //       title: "Auto close alert!",
//   //       text: "Signature Saved Successfully",
//   //     });
//   //     setImageBase64String("");
//   //     setSigImageData("");
//   //   } catch (error) {
//   //     console.error(error);
//   //   }
//   // };

//   const handleSubmit = async () => {
//     try {
//       onDone();

//       let imageBase64;

//       // Check if Imagbase64String is empty
//       if (Imagbase64String) {
//         imageBase64 = Imagbase64String;
//       } else {
//         // Check if capturedImage has a value
//         if (capturedImage) {
//           imageBase64 = capturedImage;
//         } else {
//           // Handle case when both Imagbase64String and capturedImage are empty
//           console.error('Error: No image data available.');
//           return;
//         }
//       }

//       const data = {
//         action: "add",
//         relation_no: relationNo,
//         pic: imageBase64,
//         signature: sigImageData,
//       };
//       console.log(
//         "image and signature with Data ::: =",
//         data,
//         GetSigImageB64((signatureBase64) => {
//           // console.log(signatureBase64 , "jaj")
//           // base64 = signatureBase64;
//           return signatureBase64;
//         })
//       );
//       // return;
//       const response = await axios.post(
//         "http://10.203.14.169/imaging_sig_api/api/capture.php",
//         data,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       console.log("image and signature ::: =", JSON.stringify(response.data));

//       Swal.fire({
//         title: "Auto close alert!",
//         text: "Signature Saved Successfully",
//       });
//       setImageBase64String("");
//       setSigImageData("");
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const [isSigned, setIsSigned] = useState(false);

//   const [isUploading, setIsUploading] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [selectedImageBack, setSelectedImageBack] = useState(null);
//   const [showArrow, setShowArrow] = useState(false);
//   const [showTooltip, setShowTooltip] = useState(false);
//   const [showTooltipSign, setShowTooltipSign] = useState(false);

//   const [isFlipped, setIsFlipped] = useState(false);

//   const videoRef = useRef(null);
//   // const [capturedImage, setCapturedImage] = useState(null);

//   const handleCapture = () => {
//     const video = videoRef.current;

//     if (video) {
//       const canvas = document.createElement('canvas');
//       canvas.width = video.videoWidth;
//       canvas.height = video.videoHeight;
//       canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
//       const imageDataURL = canvas.toDataURL('image/png');
//       // imageDataURL contains the base64 encoded image data
//       setCapturedImage(imageDataURL);
//     }
//   };

//   console.log("capturedImage::", capturedImage)

//   const handleStartCamera = () => {
//     navigator.mediaDevices.getUserMedia({ video: true })
//       .then(stream => {
//         const video = videoRef.current;
//         if (video) {
//           video.srcObject = stream;
//         }
//       })
//       .catch(error => {
//         console.error('Error accessing the camera:', error);
//       });
//   };

//   const tooltipContainerStyle = {
//     position: "absolute",
//   };

//   const tooltipStyle = {
//     backgroundColor: "#333",
//     color: "#fff",
//     padding: "8px",
//     borderRadius: "4px",
//     position: "relative",
//     zIndex: "999",
//     textAlign: "center",
//     bottom: "-50px",
//     right: "-190px",
//     transform: "translateX(-199%)",
//   };

//   // const arrowUpStyle = {
//   //   width: '0',
//   //   height: '0',
//   //   borderLeft: '8px solid transparent',
//   //   borderRight: '8px solid transparent',
//   //   borderBottom: '8px solid #333',
//   //   position: 'absolute',
//   //   bottom: '-100px',
//   //   left: '50%',
//   //   transform: 'translateY(-200%)',
//   // };

//   const arrowUpStyle = {
//     width: "0",
//     height: "0",
//     borderTop: "8px solid transparent",
//     borderBottom: "8px solid transparent",
//     borderLeft: "8px solid #333",
//     position: "absolute",
//     bottom: "0",
//     right: "-10px", // Align the arrow to the right edge of the tooltip
//   };

//   // const arrowAnimation = useSpring({
//   //   transform: showTooltip
//   //     ? "rotate(90deg) scale(1.2)"
//   //     : "rotate(0deg) scale(1)",
//   // });

//   const handleArrowAnimation = () => {
//     setShowArrow(true);
//     setTimeout(() => setShowArrow(false), 3000); // Adjust the duration as needed
//   };

//   const handleSignClick = () => {
//     setIsSigned(true);
//     setIsUploading(false);
//     setSelectedImage(null); // Reset selected image when signing
//     onSign();
//   };

//   const handleUploadClick = () => {
//     setIsUploading(true);
//     setIsSigned(false);
//   };

//   const handleFileChangeNew = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setSelectedImage(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // const handleFileChangeBack = (event) => {
//   //   const file = event.target.files[0];
//   //   if (file) {
//   //     const reader = new FileReader();
//   //     reader.onloadend = () => {
//   //       setSelectedImageBack(reader.result);
//   //     };
//   //     reader.readAsDataURL(file);
//   //   }
//   // };

//   const handleFileChangeBack = (event) => {
//     const file = event.target.files[0];

//     if (file) {
//       setIsUploading(true);

//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setSelectedImageBack(reader.result);
//         setIsUploading(false);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleArrowClick = () => {
//     setIsFlipped(!isFlipped);
//   };

//   const cardStyle = {
//     backgroundImage: `url('https://img.freepik.com/free-photo/abstract-blue-extruded-voronoi-blocks-background-minimal-light-clean-corporate-wall-3d-geometric-surface-illustration-polygonal-elements-displacement_1217-2510.jpg?w=1380&t=st=1707041700~exp=1707042300~hmac=6a6d21b134a323acd06c65fe251b6692e197efe167c0cb0e296c11adf1ac3698')`,
//     transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
//     transition: "transform 0.5s ease", // Add a smooth transition
//   };

//   // function ForSubmission(){
//   //   onDone()
//   // }

//   function ForSubmission() {
//     // Check if the form and the required element are present
//     if (document.sigForm && document.sigForm.bioSigData) {
//       onDone();
//     } else {
//       console.error(
//         "Form or form element not found. Check your HTML structure."
//       );
//     }
//   }

//   useEffect(() => {
//     onSign();
//   }, [refresh]);

//   const [carouselStep, setCarouselStep] = useState(0);

//   // const handleNextStep = () => {
//   //   setCarouselStep((prevStep) => prevStep + 1);
//   // };
//   const handleNextStep = () => {
//     if (carouselStep === 0) {
//       setCarouselStep(1); // Move to the next step
//       // handleStartCamera()
//     } else {
//       setCarouselStep((prevStep) => prevStep - 1); // Move to the previous step
//     }
//   };

//   const handlePrevStep = () => {
//     setCarouselStep((prevStep) => prevStep - 1);
//   };

//   const handleReset = () => {
//     setCarouselStep(0);
//   };

//   const [imageSignData, setImageSignData] = useState('')

//   const fetchData = async () => {
//     try {
//       const response = await axios.post('http://10.203.14.169/imaging_sig_api/api/update.php', {
//         relation_no: relationNo
//       }, {
//         headers: {
//           'Content-Type': 'application/json',
//           'Cookie': 'PHPSESSID=9u2i0pl759h0nejqd3u2bb4hfc'
//         }
//       });
//       console.log("Get all data::",response.data.result);
//       setImageSignData(response.data.result);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleButtonClick = (relationNumber) => {
//     console.log("................................:",relationNo)
//     open()
//     setRelationNo(relationNumber);
//     fetchData(); // Call fetchData when relation number is set
//     handleShow();
//   };

//   console.log("Photo =:",imageSignData.accsign)
//   console.log("Signature =:",imageSignData.photo)

//   return (
//     <div>

//        <Button variant="primary" onClick={() => handleButtonClick(relationNo)}>
//         View Image / Signature
//       </Button>

//       <Modal  opened={opened} onClose={close} centered>
//         {/* <Modal.Header>
//           <Modal.Title>
//             {carouselStep === 1 ? "Image Capture" :'Signature Capture'}
//           </Modal.Title>
//         </Modal.Header> */}
//           <Modal.Body>

//       <div className="">
//         <div className="w-full border border-gray-200 shadow-lg p-4 rounded">
//           <div className="flex justify-between items-center ">
//             {/* <div className=" -ml-3 -mr-3 rounded">
//               <div className="pl-1 text-xl font-semibold  text-gray-600 dark:text-white">
//                 {carouselStep === 1 ? "Image Capture" :'Signature Capture'}
//               </div>
//             </div> */}
//             <div
//               onClick={handleNextStep}
//               className="flex items-center space-x-2 cursor-pointer hover:animate-pulse"
//             >
//               <span className="text-xs text-blue-500 font-medium ">
//                 {/* Image Capture */}
//                 {carouselStep === 1 ? "Image Capture" :'Signature Capture'}
//               </span>
//               <span>
//                 <IoMdArrowRoundForward size={30} />
//               </span>
//             </div>
//           </div>
//           <hr className="-ml-4 -mr-4 pt-2 mt-2" />

//           {/* <canvas id="cnv"></canvas> */}

//           {carouselStep === 0 && (
//             <>
//             <div>
//               <text name="" id="" cols="30" rows="10">RELATION NO: <span className="text-xl font-bold"> {relationNo} </span></text>
//             </div>
//               {/* <div className="flex items-center space-x-3 justify-end mb-4">
//                 <input
//                   type="file"
//                   id="imageInput"
//                   name="imageInput"
//                   accept="image/*"
//                   className="mt-1 p-2 border hidden border-white w-full text-white"
//                   onChange={(event) =>
//                     handleFileChange(event, "cnv", "capturedImage")
//                   }
//                 />
//                 <button
//                   className={`px-4 py-[6px] rounded ${
//                     isSignatureMode
//                       ? " text-red-500 bg-red-100 font-semibold active:bg-blue-200 hover:bg-red-50 transition-colors"
//                       : "bg-gray-300 text-gray-800"
//                   }`}
//                   onClick={() => {
//                     onClear();
//                   }}
//                 >
//                   <span className="flex space-x-3">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       strokeWidth={1.5}
//                       stroke="currentColor"
//                       className="w-6 h-6"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"
//                       />
//                     </svg>

//                     <span>Reset</span>
//                   </span>
//                 </button>
//                 <button
//                   className={`px-4 py-[6px] rounded ${
//                     isSignatureMode
//                       ? " text-blue-500 bg-blue-100 font-semibold active:`bg-blue-200 hover:bg-blue-50 transition-colors"
//                       : "bg-gray-300 text-gray-800"
//                   }`}
//                   onClick={() => {
//                     document.getElementById("imageInput").click();
//                   }}
//                 >
//                   <span className="flex space-x-3">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       viewBox="0 0 24 24"
//                       fill="currentColor"
//                       className="w-6 h-6"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M10.5 3.75a6 6 0 0 0-5.98 6.496A5.25 5.25 0 0 0 6.75 20.25H18a4.5 4.5 0 0 0 2.206-8.423 3.75 3.75 0 0 0-4.133-4.303A6.001 6.001 0 0 0 10.5 3.75Zm2.03 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v4.94a.75.75 0 0 0 1.5 0v-4.94l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z"
//                         clipRule="evenodd"
//                       />
//                     </svg>

//                     <span>{isSignatureMode ? "Upload" : "Image Upload"}</span>

//                   </span>
//                 </button>
//               </div> */}

//               <div>
//                 <img
//                   // id="capturedImage"
//                   // src={base64String}
//                   // src={`data:image/png;base64,${imageSignData.accsign}`}
//                   src={`data:image/png;base64,${imageSignData.accsign}`}
//                   className="w-full rounded-md bg-white border-4 border-blue-500 border-dashed h-64  hover:shadow-gray-200 transition-all duration-200"
//                   // alt={`Converted to Base64 - ${
//                   //   isSignatureMode ? "Signature" : "Image"
//                   // }`}
//                   alt='Base64 Image'
//                 />
//               </div>

//               {/* {isSignatureMode && !base64String ? (
//                 <div className="relative w-full border-4 border-blue-500 border-dashed h-64 rounded-md bg-white  hover:shadow-gray-200 transition-all duration-200">
//                   <canvas
//                     id="cnv"
//                     name="cnv"
//                     className="w-full h-full rounded-md bg-white "
//                   ></canvas>
//                 </div>
//               ) : (
//                 <img
//                   id="capturedImage"
//                   // src={base64String}
//                   src={`data:image/png;base64, ${imageSignData.accsign}`}
//                   className="w-full  rounded-md bg-white border-4 border-blue-500 border-dashed h-64  hover:shadow-gray-200 transition-all duration-200"
//                   // alt={`Converted to Base64 - ${
//                   //   isSignatureMode ? "Signature" : "Image"
//                   // }`}
//                   alt='Image'
//                 />
//               )} */}

//               {/* <div className="flex justify-end space-x-3 my-4">

//                 <button
//                   className={`px-4 py-2 rounded ${
//                     isSignatureMode
//                       ? " text-white bg-blue-500 font-semibold active:bg-green-200 hover:bg-bblue-600  transition-colors"
//                       : "bg-gray-300 text-gray-800"
//                   }`}
//                   onClick={() => {
//                     handleSubmit();
//                   }}
//                 >
//                   <span className="flex space-x-3">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       viewBox="0 0 24 24"
//                       fill="currentColor"
//                       className="w-6 h-6"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z"
//                         clipRule="evenodd"
//                       />
//                       <path
//                         fillRule="evenodd"
//                         d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375Zm9.586 4.594a.75.75 0 0 0-1.172-.938l-2.476 3.096-.908-.907a.75.75 0 0 0-1.06 1.06l1.5 1.5a.75.75 0 0 0 1.116-.062l3-3.75Z"
//                         clipRule="evenodd"
//                       />
//                     </svg>

//                     <span>Submit</span>
//                   </span>
//                 </button>
//               </div> */}
//             </>
//           )}
//           {carouselStep === 1 && (
//             <>
//             <div>
//               <text name="" id="" cols="30" rows="10">RELATION NO: <span className="text-xl font-bold"> {relationNo} </span></text>
//             </div>
//               {/* <div className="flex items-center space-x-3 justify-end mb-4">
//                 <input
//                   type="file"
//                   id="imageInput"
//                   name="imageInput"
//                   accept="image/*"
//                   className="mt-1 p-2 border hidden border-white w-full text-white"
//                   onChange={(event) =>
//                     handleFileChangeImage(event, "cnv", "capturedImage")
//                   }
//                 />
//                 <button
//                   className={`px-4 py-[6px] rounded ${
//                     isSignatureMode
//                       ? " text-red-500 bg-red-100 font-semibold active:bg-blue-200 hover:bg-red-50 transition-colors"
//                       : "bg-gray-300 text-gray-800"
//                   }`}
//                   // onClick={() => {
//                   //   onClear();
//                   // }}
//                   onClick={handleCapture}
//                 >
//                   <span className="flex space-x-3">
//                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
//                       <path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
//                       <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
//                     </svg>

//                     <span>Capture</span>
//                   </span>
//                 </button>
//                 <button
//                   className={`px-4 py-[6px] rounded ${
//                     isSignatureMode
//                       ? " text-blue-500 bg-blue-100 font-semibold active:`bg-blue-200 hover:bg-blue-50 transition-colors"
//                       : "bg-gray-300 text-gray-800"
//                   }`}
//                   onClick={() => {
//                     document.getElementById("imageInput").click();
//                   }}
//                 >
//                   <span className="flex space-x-3">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       viewBox="0 0 24 24"
//                       fill="currentColor"
//                       className="w-6 h-6"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M10.5 3.75a6 6 0 0 0-5.98 6.496A5.25 5.25 0 0 0 6.75 20.25H18a4.5 4.5 0 0 0 2.206-8.423 3.75 3.75 0 0 0-4.133-4.303A6.001 6.001 0 0 0 10.5 3.75Zm2.03 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v4.94a.75.75 0 0 0 1.5 0v-4.94l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z"
//                         clipRule="evenodd"
//                       />
//                     </svg>

//                     <span>{isSignatureMode ? "Upload" : "Image Upload"}</span>
//                     <div>
//                   </div>
//                   </span>
//                 </button>
//               </div> */}

//                 <div className="flex justify-center">
//                   <div className="">

//                       <img
//                       id="capturedImage"
//                       src={`data:image/png;base64,${imageSignData.photo}`}
//                       className=" aspect-square rounded-md bg-white border-4 border-blue-500 border-dashed h-64  hover:shadow-gray-200 transition-all duration-200"
//                       alt='Image'
//                       />

//                   </div>
//                 </div>

//               {/* <div className="flex justify-end space-x-3 my-4">
//                 <button
//                   className={`px-4 py-2 rounded ${
//                     isSignatureMode
//                       ? " text-white bg-blue-500 font-semibold active:bg-green-200 hover:bg-bblue-600  transition-colors"
//                       : "bg-gray-300 text-gray-800"
//                   }`}
//                   onClick={() => {
//                     handleSubmit();
//                   }}
//                 >
//                   <span className="flex space-x-3">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       viewBox="0 0 24 24"
//                       fill="currentColor"
//                       className="w-6 h-6"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z"
//                         clipRule="evenodd"
//                       />
//                       <path
//                         fillRule="evenodd"
//                         d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375Zm9.586 4.594a.75.75 0 0 0-1.172-.938l-2.476 3.096-.908-.907a.75.75 0 0 0-1.06 1.06l1.5 1.5a.75.75 0 0 0 1.116-.062l3-3.75Z"
//                         clipRule="evenodd"
//                       />
//                     </svg>

//                     <span>Submit</span>
//                   </span>
//                 </button>
//               </div> */}
//             </>
//           )}

//           {/* {base64String && (
//       <div>
//         <h2>Base64 Encoded {isSignatureMode ? 'Signature' : 'Image'}:</h2>
//         <img
//           id="capturedImage"
//           src={base64String}
//           alt={`Converted to Base64 - ${isSignatureMode ? 'Signature' : 'Image'}`}
//         />
//         <div
//           style={{
//             overflow: 'auto',
//             maxHeight: '200px',
//             border: '1px solid #000',
//             padding: '10px',
//             backgroundColor: 'white',
//           }}
//         >
//           <div>{base64String}</div>
//         </div>
//       </div>
//     )} */}
//         </div>
//       </div>
//       <div className="container mx-auto p-8 flex">
//         {/* <div className="w-1/2 border border-gray-500 bg-slate-500 p-4 rounded">
//           <div className="-mt-3 -ml-3 -mr-3 rounded">
//             <div className="pl-1 text-xl font-black text-gray-900 dark:text-white">
//               Capture Signature
//             </div>
//           </div>
//           <hr className="-ml-4 -mr-4 pt-2 mt-2" />

//           <input
//             type="file"
//             id="imageInput"
//             name="imageInput"
//             accept="image/*"
//             className="mt-1 p-2 border border-white w-full text-white"
//             // onChange={
//             // 	(event) => handleImageCapture(event, 'cnv', 'capturedImage')
//             // }
//             onChange={(event) => handleFileChange(event, "cnv", "capturedImage")}
//           />
//           <div className="bg-white shadow-lg hover:shadow-gray-700 rounded">
//             <canvas
//               id="cnv"
//               name="cnv"
//               className="mt-4 w-full h-64 rounded"
//             ></canvas>
//           </div>

//           {base64String && (
//             <div>
//               <h2>Base64 Encoded Image:</h2>
//               <img
//                 id="capturedImage"
//                 src={base64String}
//                 alt="Converted to Base64"
//               />
//               <div
//                 style={{
//                   overflow: "auto",
//                   maxHeight: "200px",
//                   border: "1px solid #000",
//                   padding: "10px",
//                   backgroundColor: "white",
//                 }}
//               >
//                 <div>{base64String}</div>
//               </div>
//             </div>
//           )}
//         </div> */}

//         {/* <textarea
//                   name="sigStringData"
//                   rows="5"
//                   cols="30"
//                   className="w-full p-2 border border-gray-400"
//                   placeholder="SigString: "
//                   value={sigStringData}
//                   onChange={(e) => setSigStringData(e.target.value)}
//                 ></textarea>
//                 <textarea
//                   name="sigImageData"
//                   rows="5"
//                   cols="30"
//                   className="w-full p-2 border border-gray-400 mt-2"
//                   placeholder="Base64 String: "
//                   value={sigImageData}
//                   onChange={(e) => setSigImageData(e.target.value)}
//                 ></textarea> */}

//       </div>
//       </Modal.Body>
//       </Modal>
//     </div>
//   );
// };

// export default Signature_image_view;

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
// import { Tooltip } from "react-tooltip";
import { IoArrowRedo } from "react-icons/io5";
import { IoMdArrowRoundForward } from "react-icons/io";
// import { useSpring, animated } from "react-spring";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";
// import { Modal, Button } from '@mantine/core';
// import 'bootstrap/dist/css/bootstrap.min.css';

const Signature_image_view = ({ id }) => {
  const [sigStringData, setSigStringData] = useState("");
  const [sigImageData, setSigImageData] = useState("");
  const [imageCapturedData, setImageCapturedData] = useState("");
  const [check, setCheck] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  // const [opened, setOpened] = useState(false);
  const [show, setShow] = useState(false);

  const [opened, { open, close }] = useDisclosure(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const clearImage = () => {
    // Clear the captured image state
    setCapturedImage(null);

    // Clear the file input by resetting its value
    const fileInput = document.getElementById("imageInputCap");
    if (fileInput) {
      fileInput.value = "";
    }

    // Clear the canvas by getting its context and clearing it
    const canvas = document.getElementById("imageCnv");
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  // const submitForm = () => {
  //   const formData = new FormData();
  //   formData.append("sigStringData", sigStringData);
  //   formData.append("sigImageData", sigImageData);
  //   formData.append("imageCapturedData", imageCapturedData);

  //   fetch("http://localhost:3001/process_form", {
  //     method: "POST",
  //     body: formData,
  //   })
  //     .then((response) => response.text())
  //     .then((data) => {
  //       console.log(data);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // };

  const handleImageCapture = (event, canvasId, imageId) => {
    const fileInput = event.target;
    const canvas = document.getElementById(canvasId);

    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];

      const reader = new FileReader();
      reader.onload = function (e) {
        const imageUrl = e.target.result;

        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.onload = function () {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
        img.src = imageUrl;
      };

      reader.readAsDataURL(file);
    }
  };

  //SigWebTablet JavaScript File for SigWeb
  //
  //Version - 1.0.4.0
  //
  //Last updated by Topaz Systems Inc. - 1/5/2021
  //

  // var getBlobURL =
  //   (window.URL && URL.createObjectURL.bind(URL)) ||
  //   (window.URL && URL.createObjectURL.bind(URL)) ||
  //   window.createObjectURL;
  // var revokeBlobURL =
  //   (window.URL && URL.revokeObjectURL.bind(URL)) ||
  //   (window.URL && URL.revokeObjectURL.bind(URL)) ||
  //   window.revokeObjectURL;

  // var baseUri = makeUri();
  // var ctx;

  // // function IsSigWebInstalled() {
  // //   var xhr = new XMLHttpRequest();
  // //   try {
  // //     xhr.onreadystatechange = function () {
  // //       if (xhr.readyState == 4 && xhr.status == 0) {
  // //         console.log(
  // //           "Unknown Error Occured. SigWeb Service response not received."
  // //         );
  // //         return false;
  // //       }
  // //     };
  // //     xhr.open(
  // //       "GET",
  // //       baseUri + "TabletState" + "?noCache=" + generateUUID(),
  // //       false
  // //     );
  // //     xhr.send();
  // //   } catch (e) {
  // //     console.log("catch", e);
  // //   }

  // //   return xhr.status != 404 && xhr.status != 0;
  // // }

  // function isIE() {
  //   return (
  //     navigator.appName == "Microsoft Internet Explorer" ||
  //     (navigator.appName == "Netscape" &&
  //       new RegExp("Trident/.*rv:([0-9]{1,}[.0-9]{0,})").exec(
  //         navigator.userAgent
  //       ) != null)
  //   );
  // }

  // function isChrome() {
  //   var ua = navigator.userAgent;
  //   var chrome = false;

  //   //Javascript Browser Detection - Chrome
  //   if (ua.lastIndexOf("Chrome/") > 0) {
  //     //var version = ua.substr(ua.lastIndexOf('Chrome/') + 7, 2);
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  // function makeUri() {
  //   var prot = window.location.protocol;
  //   if (prot == "file:") {
  //     prot = "http:";
  //   }

  //   if (isIE()) {
  //     if (prot == "https:") {
  //       return prot + "//tablet.sigwebtablet.com:47290/SigWeb/";
  //     } else {
  //       return prot + "//tablet.sigwebtablet.com:47289/SigWeb/";
  //     }
  //   }

  //   if (isChrome()) {
  //     if (prot == "https:") {
  //       return prot + "//tablet.sigwebtablet.com:47290/SigWeb/";
  //     } else {
  //       return prot + "//tablet.sigwebtablet.com:47289/SigWeb/";
  //     }
  //   } else {
  //     //FIREFOX
  //     if (prot == "https:") {
  //       return prot + "//tablet.sigwebtablet.com:47290/SigWeb/";
  //     } else {
  //       return prot + "//tablet.sigwebtablet.com:47289/SigWeb/";
  //     }
  //   }
  // }

  // // function SigWebcreateXHR() {
  // // 	try { return new XMLHttpRequest(); } catch (e) { }
  // // 	try { return new ActiveXObject("Msxml2.XMLHTTP.6.0"); } catch (e) { }
  // // 	try { return new ActiveXObject("Msxml2.XMLHTTP.3.0"); } catch (e) { }
  // // 	try { return new ActiveXObject("Msxml2.XMLHTTP"); } catch (e) { }
  // // 	try { return new ActiveXObject("Microsoft.XMLHTTP"); } catch (e) { }

  // // 	alert("XMLHttpRequest not supported");
  // // 	return null;
  // // }

  // // function SigWebcreateXHR() {
  // //   if (window.XMLHttpRequest) {
  // //     return new XMLHttpRequest();
  // //   } else {
  // //     console.error("XMLHttpRequest not supported");
  // //     return null;
  // //   }
  // // }

  // // function SigWebSetProperty(prop) {
  // //   var xhr = SigWebcreateXHR();

  // //   if (xhr) {
  // //     xhr.open("POST", baseUri + prop, true);
  // //     xhr.send(null);
  // //     if (xhr.readyState == 4 && xhr.status == 200) {
  // //       return xhr.responseText;
  // //     }
  // //   }
  // //   return "";
  // // }

  // var Count = false;

  // // function SigWebSetProperty(prop) {
  // // 	var xhr = SigWebcreateXHR();

  // // 	if (xhr) {
  // // 		xhr.open("POST", baseUri + prop, true);
  // // 		xhr.send(null);
  // // 		if (xhr.readyState == 4 && xhr.status == 200) {
  // // 			return xhr.responseText;
  // // 		}
  // // 	}
  // // 	return "";
  // // }

  // // function SigWebSetPropertySync(prop) {
  // //   var xhr = SigWebcreateXHR();

  // //   if (xhr) {
  // //     xhr.open("POST", baseUri + prop, false);
  // //     xhr.send();
  // //     if (xhr.readyState == 4 && xhr.status == 200) {
  // //       return xhr.responseText;
  // //     }
  // //   }
  // //   return "";
  // // }

  // // function SigWebSetStreamProperty(prop, strm) {
  // //   var xhr = SigWebcreateXHR();

  // //   if (xhr) {
  // //     xhr.open("POST", baseUri + prop);
  // //     xhr.setRequestHeader("Content-Type", "text/plain");
  // //     xhr.send(strm);
  // //     //			if (xhr.readyState == 4 && xhr.status == 200) {
  // //     //				return xhr.responseText;
  // //     //			}
  // //   }
  // //   return "";
  // // }

  // // function SigWebSyncSetStreamProperty(prop, strm) {
  // //   var xhr = SigWebcreateXHR();

  // //   if (xhr) {
  // //     xhr.open("POST", baseUri + prop, false);
  // //     xhr.setRequestHeader("Content-Type", "text/plain");
  // //     xhr.send(strm);
  // //     if (xhr.readyState == 4 && xhr.status == 200) {
  // //       return xhr.responseText;
  // //     }
  // //   }
  // //   return "";
  // // }

  // // function SigWebSetImageStreamProperty(prop, strm) {
  // //   var xhr = SigWebcreateXHR();

  // //   if (xhr) {
  // //     xhr.open("POST", baseUri + prop, false);
  // //     xhr.setRequestHeader("Content-Type", "image/png");
  // //     xhr.send(strm);
  // //     if (xhr.readyState == 4 && xhr.status == 200) {
  // //       return xhr.responseText;
  // //     }
  // //   }
  // //   return "";
  // // }

  // // function SigWebSetImageBlobProperty(prop, strm) {
  // //   var xhr = SigWebcreateXHR();

  // //   //			var bb = new BlobBuilder();
  // //   //			bb.append( strm );
  // //   //			bb.append( "\0" );
  // //   //			var blob = bb.getBlob( );

  // //   if (xhr) {
  // //     xhr.open("POST", baseUri + prop, false);
  // //     xhr.setRequestHeader("Content-Type", "blob");
  // //     xhr.send(strm);
  // //     if (xhr.readyState == 4 && xhr.status == 200) {
  // //       return xhr.responseText;
  // //     }
  // //   }
  // //   return "";
  // // }

  // // function SigWebGetProperty(prop) {
  // //   var xhr = SigWebcreateXHR();

  // //   if (xhr) {
  // //     xhr.open("GET", baseUri + prop + "?noCache=" + generateUUID(), false);
  // //     xhr.send(null);
  // //     if (xhr.readyState == 4 && xhr.status == 200) {
  // //       return xhr.responseText;
  // //     }
  // //   }
  // //   return "";
  // // }

  // var SigImageB64;

  // //	function GetSigImageB64(callback)
  // //		{
  // //		var cvs = document.createElement('canvas');
  // //		cvs.width = GetImageXSize();
  // //		cvs.height = GetImageYSize();
  // //
  // //		var xhr2 = new XMLHttpRequest();
  // //		xhr2.open("GET", baseUri + "SigImage/1", false);
  // //		xhr2.responseType = "blob";
  // //		xhr2.send(null);
  // //		if (xhr2.readyState == 4 && xhr.status == 200)
  // //			{
  // //			var cntx = cvs.getContext('2d');
  // //			var img = new Image();
  // //			img.src = window.URL.createObjectURL(xhr2.response);
  // //			img.onload = function ()
  // //				{
  // //				cntx.drawImage(img, 0, 0);
  // //				var b64String = cvs.toDataURL("image/png");
  // //				var loc = b64String.search("base64,");
  // //				var retstring = b64String.slice(loc + 7, b64String.length);
  // //				if (callback)
  // //					{
  // //					callback(retstring);
  // //					}
  // //				}
  // //			}
  // //		}

  // // function GetSigImageB64(callback) {
  // //   var cvs = document.createElement("canvas");
  // //   cvs.width = GetImageXSize();
  // //   cvs.height = GetImageYSize();

  // //   var xhr2 = new XMLHttpRequest();
  // //   xhr2.open(
  // //     "GET",
  // //     baseUri + "SigImage/1" + "?noCache=" + generateUUID(),
  // //     true
  // //   );
  // //   xhr2.responseType = "blob";
  // //   xhr2.send(null);
  // //   xhr2.onload = function () {
  // //     var cntx = cvs.getContext("2d");
  // //     var img = new Image();
  // //     //			img.src = window.URL.createObjectURL(xhr2.response);
  // //     img.src = getBlobURL(xhr2.response);
  // //     img.onload = function () {
  // //       cntx.drawImage(img, 0, 0);
  // //       var b64String = cvs.toDataURL("image/png");
  // //       var loc = b64String.search("base64,");
  // //       var retstring = b64String.slice(loc + 7, b64String.length);
  // //       if (callback) {
  // //         callback(retstring);
  // //       }
  // //     };
  // //   };
  // // }

  // // function GetSigImageB64(callback) {
  // //   var cvs = document.createElement("canvas");
  // //   cvs.width = GetImageXSize();
  // //   cvs.height = GetImageYSize();

  // //   var xhr2 = new XMLHttpRequest();
  // //   xhr2.open(
  // //       "GET",
  // //       baseUri + "SigImage/1" + "?noCache=" + generateUUID(),
  // //       true
  // //   );
  // //   xhr2.responseType = "blob";
  // //   xhr2.send(null);
  // //   xhr2.onload = function () {
  // //       var cntx = cvs.getContext("2d");
  // //       var img = new Image();
  // //       //			img.src = window.URL.createObjectURL(xhr2.response);
  // //       img.src = getBlobURL(xhr2.response);
  // //       img.onload = function () {
  // //           cntx.drawImage(img, 0, 0);
  // //           var b64String = cvs.toDataURL("image/jpeg"); // Change "image/png" to "image/jpeg"
  // //           var retstring = b64String.replace(/^data:image\/jpeg;base64,/, ''); // Remove existing prefix
  // //           if (callback) {
  // //               callback("data:image/jpeg;base64," + retstring); // Concatenate new prefix
  // //           }
  // //       };
  // //   };
  // // }

  // // function SigWebWaitForPenDown(callback) {
  // //   var xhr = SigWebcreateXHR();

  // //   if (xhr) {
  // //     xhr.open(
  // //       "GET",
  // //       baseUri + "WaitForPenDown" + "?noCache=" + generateUUID()
  // //     );
  // //     xhr.timeout = 10000;
  // //     xhr.onreadystatechange = function () {
  // //       if (xhr.readyState != 4) return;
  // //       if (xhr.status == 200) callback();
  // //     };
  // //     xhr.send(null);
  // //   }
  // // }

  // // function GetSigImage(ctx) {
  // //   var xhr2 = new XMLHttpRequest();
  // //   xhr2.open(
  // //     "GET",
  // //     baseUri + "SigImage/1" + "?noCache=" + generateUUID(),
  // //     true
  // //   );
  // //   xhr2.responseType = "blob";
  // //   xhr2.send(null);
  // //   xhr2.onload = function () {
  // //     var img = new Image();
  // //     img.src = getBlobURL(xhr2.response);
  // //     img.onload = function () {
  // //       ctx.drawImage(img, 0, 0);
  // //       revokeBlobURL(this.src);
  // //       img = null;
  // //     };
  // //   };
  // // }

  // var EvStatus;
  // var onSigPenDown;
  // var onSigPenUp;

  // function SigWebSetDisplayTarget(obj) {
  //   ctx = obj;
  // }

  // var NumPointsLastTime = 0;

  // // function SigWebRefresh() {
  // //   var NumPoints = NumberOfTabletPoints();
  // //   if (NumPoints == NumPointsLastTime) {
  // //     return;
  // //   }
  // //   NumPointsLastTime = NumPoints;

  // //   var xhr2 = new XMLHttpRequest();
  // //   xhr2.open(
  // //     "GET",
  // //     baseUri + "SigImage/0" + "?noCache=" + generateUUID(),
  // //     true
  // //   );
  // //   xhr2.responseType = "blob";
  // //   xhr2.onload = function () {
  // //     var img = new Image();
  // //     img.src = getBlobURL(xhr2.response);
  // //     //				img.src = window.URL.createObjectURL(xhr2.response);
  // //     img.onload = function () {
  // //       ctx.drawImage(img, 0, 0);
  // //       revokeBlobURL(this.src);
  // //       img = null;
  // //     };
  // //   };
  // //   xhr2.send(null);
  // // }

  // // function SigWebEvent() {
  // //   var OldEvStatus = EvStatus;

  // //   var xhr = SigWebcreateXHR();

  // //   if (xhr) {
  // //     xhr.open(
  // //       "GET",
  // //       baseUri + "EventStatus" + "?noCache=" + generateUUID(),
  // //       true
  // //     );
  // //     xhr.onload = function () {
  // //       EvStatus = xhr.responseText;
  // //       if (OldEvStatus & 0x01 && EvStatus & 0x02) {
  // //         if (onSigPenDown) {
  // //           onSigPenDown();
  // //         }
  // //       }

  // //       if (OldEvStatus & 0x02 && EvStatus & 0x01) {
  // //         if (onSigPenUp) {
  // //           onSigPenUp();
  // //         }
  // //       }
  // //     };
  // //     xhr.send(null);
  // //   }
  // // }

  // function generateUUID() {
  //   var d = new Date().getTime();
  //   if (
  //     typeof performance !== "undefined" &&
  //     typeof performance.now === "function"
  //   ) {
  //     d += performance.now(); //use high-precision timer if available
  //   }
  //   return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
  //     /[xy]/g,
  //     function (c) {
  //       var r = (d + Math.random() * 16) % 16 | 0;
  //       d = Math.floor(d / 16);
  //       return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  //     }
  //   );
  // }

  // var SigWebFontThreshold = 155;

  // function setSigWebFontThreshold(v) {
  //   SigWebFontThreshold = v;
  // }

  // function createLcdBitmapFromCanvas(ourCanvas, xp, yp, width, height) {
  //   var canvasCtx = ourCanvas.getContext("2d");
  //   var imgData = canvasCtx.getImageData(0, 0, width, height);
  //   var j = 0;
  //   var sVal = 0;
  //   var outData = "";
  //   var outIdx = 0;
  //   var data = imgData.data;

  //   for (var y = 0; y < height; y++)
  //     for (var x = 0; x < width; x++) {
  //       var tmp1 = data[j];
  //       var tmp2 = data[j + 1];
  //       var tmp3 = data[j + 2];
  //       var tmp4 = data[j + 3];

  //       //					sVal = tmp1 + (tmp2 << 8 ) + ( tmp3 << 16 ) + (tmp4 << 24 );
  //       j = j + 4;
  //       if (tmp1 < SigWebFontThreshold) {
  //         outData += "B";
  //       } else {
  //         outData += "W";
  //       }
  //     }

  //   return outData;
  // }

  // function toHex(NibVal) {
  //   switch (NibVal) {
  //     case 0:
  //       return "0";
  //     case 1:
  //       return "1";
  //     case 2:
  //       return "2";
  //     case 3:
  //       return "3";
  //     case 4:
  //       return "4";
  //     case 5:
  //       return "5";
  //     case 6:
  //       return "6";
  //     case 7:
  //       return "7";
  //     case 8:
  //       return "8";
  //     case 9:
  //       return "9";
  //     case 10:
  //       return "A";
  //     case 11:
  //       return "B";
  //     case 12:
  //       return "C";
  //     case 13:
  //       return "D";
  //     case 14:
  //       return "E";
  //     case 15:
  //       return "F";
  //   }
  // }

  // function ToHexString(ByteVal) {
  //   var Str = "";
  //   Str += toHex((ByteVal >> 4) & 0x0f);
  //   Str += toHex(ByteVal & 0x0f);
  //   return Str;
  // }

  // function textToTablet(x, y, height, str, fnt) {
  //   var c = document.createElement("canvas");
  //   var cntx = c.getContext("2d");
  //   cntx.font = fnt;
  //   var txt = str;
  //   var xs = Math.round(cntx.measureText(txt).width);
  //   var ys = height;
  //   c.width = xs;
  //   c.height = ys;

  //   cntx.font = fnt;
  //   cntx.fillStyle = "#FFFFFF";
  //   cntx.rect(0, 0, xs, ys);
  //   cntx.fill();

  //   cntx.fillStyle = "#000000";
  //   cntx.textBaseline = "top";
  //   cntx.fillText(txt, 0, 0);

  //   cntx.drawImage(cntx.canvas, 0, 0, xs, ys);

  //   var Gstr = createLcdBitmapFromCanvas(c, 0, 0, xs, ys);

  //   LcdWriteImageStream(0, 2, x, y, xs, ys, Gstr);
  // }

  // // function LcdWriteImage(Dst, Mode, Xp, Yp, Url) {
  // //   var Prop = "LcdWriteImage/";
  // //   var NewUrl = Url.replace(/\//g, "_");

  // //   Prop = Prop + Dst + "," + Mode + "," + Xp + "," + Yp + "," + NewUrl;
  // //   SigWebSetPropertySync(Prop);
  // // }

  // function LcdWriteLocalImage(Dst, Mode, Xp, Yp, Url) {
  //   var Prop = "LcdWriteImage/";

  //   Prop = Prop + Dst + "," + Mode + "," + Xp + "," + Yp + "," + Url;
  //   SigWebSetProperty(Prop);
  // }

  // // function LcdWriteImageStream(Dst, Mode, Xp, Yp, Xs, Ys, Url) {
  // //   var Prop1 =
  // //     "LcdWriteImageStreamParams/" +
  // //     Dst +
  // //     "," +
  // //     Mode +
  // //     "," +
  // //     Xp +
  // //     "," +
  // //     Yp +
  // //     "," +
  // //     Xs +
  // //     "," +
  // //     Ys;
  // //   var Prop2 = "LcdWriteImageStream/";

  // //   SigWebSetPropertySync(Prop1);
  // //   SigWebSetImageStreamProperty(Prop2, Url);
  // // }

  // function LcdWriteImageBlob(Dst, Mode, Xp, Yp, Xs, Ys, Url) {
  //   var Prop = "LcdWriteImageStream/";

  //   Prop = Prop + Dst + "," + Mode + "," + Xp + "," + Yp + "," + Xs + "," + Ys;
  //   SigWebSetImageBlobProperty(Prop, Url);
  // }

  // function measureText(pText, pFontSize, pStyle) {
  //   var lDiv = document.createElement("lDiv");

  //   document.body.appendChild(lDiv);

  //   if (pStyle != null) {
  //     lDiv.style = pStyle;
  //   }
  //   lDiv.style.fontSize = "" + pFontSize + "px";
  //   lDiv.style.position = "absolute";
  //   lDiv.style.left = -1000;
  //   lDiv.style.top = -1000;

  //   lDiv.innerHTML = pText;

  //   var lResult = {
  //     width: lDiv.clientWidth,
  //     height: lDiv.clientHeight,
  //   };

  //   document.body.removeChild(lDiv);
  //   lDiv = null;

  //   return lResult;
  // }

  // // function GetSigWebVersion() {
  // //   var prop = "SigWebVersion";

  // //   var xhr = SigWebcreateXHR();

  // //   if (xhr) {
  // //     xhr.open("GET", baseUri + prop + "?noCache=" + generateUUID(), false);
  // //     xhr.send(null);
  // //     if (xhr.readyState == 4 && xhr.status == 200) {
  // //       return xhr.responseText.slice(1, xhr.responseText.length - 1);
  // //     } else {
  // //       return "1.5"; //the currentversion of the SigWeb service is not installed
  // //     }
  // //   }
  // //   return "";
  // // }

  // //
  // //
  // //
  // //
  // //
  // //
  // //			Start of dll method wrappers
  // //
  // //
  // //			SigPlusNET.cs
  // //
  // function GetVersionString() {
  //   var Prop = "Version";

  //   Prop = Prop;
  //   var Str = SigWebGetProperty(Prop);
  //   var trimStr = Str.slice(1, Str.length - 2);
  //   return trimStr;
  // }

  // function IsPenDown() {
  //   return EvStatus & 0x01;
  // }

  // function GetDaysUntilCertificateExpires() {
  //   var Prop = "DaysUntilCertificateExpires";

  //   Prop = Prop;
  //   return SigWebGetProperty(Prop);
  // }

  // //
  // //			SigPlusNETSig.cs
  // //
  // function ClearTablet() {
  //   // onSign()
  //   var Prop = "ClearSignature";

  //   Prop = Prop;
  //   return SigWebGetProperty(Prop);
  // }

  // function NumberOfTabletPoints() {
  //   var Prop = "TotalPoints";

  //   Prop = Prop;
  //   return SigWebGetProperty(Prop);
  // }

  // //		function  ExportSigFile(  FileName ) {}
  // //		function  ImportSigFile(  FileName ) {}

  // // function SetSigString(sigStr, ctx) {
  // //   var Prop = "SigString";

  // //   Prop = Prop;
  // //   var xhr = SigWebcreateXHR();

  // //   if (xhr) {
  // //     xhr.open("POST", baseUri + Prop);
  // //     xhr.setRequestHeader("Content-Type", "text/plain");
  // //     xhr.send(sigStr);
  // //     xhr.onload = function () {
  // //       if (ctx) {
  // //         var can = ctx.canvas;
  // //         SetImageXSize(can.width);
  // //         SetImageYSize(can.height);
  // //         GetSigImage(ctx);
  // //       }
  // //     };
  // //   }
  // //   return "";
  // // }

  // function GetSigString() {
  //   var Prop = "SigString";

  //   Prop = Prop;
  //   var Str = SigWebGetProperty(Prop);

  //   return Str.slice(1, Str.length - 1);
  // }

  // // function SetSigCompressionMode(v) {
  // //   var Prop = "CompressionMode/";

  // //   Prop = Prop + v;
  // //   SigWebSetPropertySync(Prop);
  // // }

  // function GetSigCompressionMode() {
  //   var Prop = "CompressionMode";

  //   Prop = Prop;
  //   return SigWebGetProperty(Prop);
  // }

  // // function SetEncryptionMode(v) {
  // //   var Prop = "EncryptionMode/";

  // //   Prop = Prop + v;
  // //   SigWebSetPropertySync(Prop);
  // // }

  // function GetEncryptionMode() {
  //   var Prop = "EncryptionMode";

  //   Prop = Prop;
  //   return SigWebGetProperty(Prop);
  // }

  // //		function  SetKey( Keydata ) {}
  // //		function  GetKey( ) {}

  // function SetKeyString(keyString) {
  //   var Prop = "KeyString";

  //   Prop = Prop;
  //   SigWebSetStreamProperty(Prop, keyString);
  // }

  // function GetKeyString() {
  //   var Prop = "KeyString";

  //   Prop = Prop;
  //   var Str = SigWebGetProperty(Prop);

  //   return Str.slice(1, Str.length - 1);
  // }

  // function AutoKeyStart() {
  //   var Prop = "AutoKeyStart";

  //   Prop = Prop;
  //   SigWebSetPropertySync(Prop);
  // }

  // function AutoKeyFinish() {
  //   var Prop = "AutoKeyFinish";

  //   Prop = Prop;
  //   SigWebSetPropertySync(Prop);
  // }

  // function SetAutoKeyData(keyData) {
  //   var Prop = "SetAutoKeyData";

  //   Prop = Prop;
  //   SigWebSetStreamProperty(Prop, keyData);
  // }

  // function AutoKeyAddData(keyData) {
  //   var Prop = "AutoKeyAddData";

  //   Prop = Prop;
  //   SigWebSetStreamProperty(Prop, keyData);
  //   return GetKeyString();
  // }

  // function AutoKeyAddANSIData(keyData) {
  //   var Prop = "AutoKeyAddANSIData";

  //   Prop = Prop;
  //   var isASCII = SigWebSyncSetStreamProperty(Prop, keyData);
  //   return isASCII;
  // }

  // //		function  GetKeyReceipt( ) {}

  // function GetKeyReceiptAscii() {
  //   var Prop = "KeyReceiptAscii";

  //   Prop = Prop;
  //   var Str = SigWebGetProperty(Prop);

  //   return Str.slice(1, Str.length - 1);
  // }

  // //		function  GetSigReceipt( ) {}

  // function GetSigReceiptAscii() {
  //   var Prop = "SigReceiptAscii";

  //   Prop = Prop;
  //   var Str = SigWebGetProperty(Prop);

  //   return Str.slice(1, Str.length - 1);
  // }

  // function SetTimeStamp(timeStamp) {
  //   var Prop = "TimeStamp";

  //   Prop = Prop;
  //   SigWebSetStreamProperty(Prop, timeStamp);
  // }

  // function GetTimeStamp() {
  //   var Prop = "TimeStamp";

  //   Prop = Prop;
  //   var Str = SigWebGetProperty(Prop);

  //   return Str.slice(1, Str.length - 1);
  // }

  // function SetAnnotate(annotate) {
  //   var Prop = "Annotate";

  //   Prop = Prop;
  //   SigWebSetStreamProperty(Prop, annotate);
  // }

  // function GetAnnotate() {
  //   var Prop = "Annotate";

  //   Prop = Prop;
  //   var Str = SigWebGetProperty(Prop);

  //   return Str.slice(1, Str.length - 1);
  // }

  // function SetSaveSigInfo(v) {
  //   var Prop = "SaveSigInfo/";

  //   Prop = Prop + v;
  //   SigWebSetPropertySync(Prop);
  // }

  // function GetSaveSigInfo() {
  //   var Prop = "SaveSigInfo";

  //   Prop = Prop;
  //   return SigWebGetProperty(Prop);
  // }

  // function SetSavePressureData(v) {
  //   var Prop = "SavePressureData/";

  //   Prop = Prop + v;
  //   SigWebSetPropertySync(Prop);
  // }

  // function GetSavePressureData() {
  //   var Prop = "SavePressureData";

  //   Prop = Prop;
  //   return SigWebGetProperty(Prop);
  // }

  // function SetSaveTimeData(v) {
  //   var Prop = "SaveTimeData/";

  //   Prop = Prop + v;
  //   SigWebSetPropertySync(Prop);
  // }

  // function GetSaveTimeData() {
  //   var Prop = "SaveTimeData";

  //   Prop = Prop;
  //   return SigWebGetProperty(Prop);
  // }

  // function SetAntiAliasSpotSize(v) {
  //   var Prop = "AntiAliasSpotSize/";

  //   Prop = Prop + v;
  //   SigWebSetPropertySync(Prop);
  // }

  // function GetAntiAliasSpotSize() {
  //   var Prop = "AntiAliasSpotSize";

  //   Prop = Prop;
  //   return SigWebGetProperty(Prop);
  // }

  // function SetAntiAliasLineScale(v) {
  //   var Prop = "AntiAliasLineScale/";

  //   Prop = Prop + v;
  //   SigWebSetPropertySync(Prop);
  // }

  // function GetAntiAliasLineScale() {
  //   var Prop = "AntiAliasLineScale";

  //   Prop = Prop;
  //   return SigWebGetProperty(Prop);
  // }

  // function GetNumberOfStrokes() {
  //   var Prop = "NumberOfStrokes";

  //   Prop = Prop;
  //   return SigWebGetProperty(Prop);
  // }

  // function GetNumPointsForStroke(v) {
  //   var Prop = "NumberOfPointsInStroke/";

  //   Prop = Prop + v;
  //   return SigWebGetProperty(Prop);
  // }

  // function GetPointXValue(v1, v2) {
  //   var Prop = "PointXValue/";

  //   Prop = Prop + v1 + "/" + v2;
  //   return SigWebGetProperty(Prop);
  // }

  // function GetPointYValue(v1, v2) {
  //   var Prop = "PointYValue/";

  //   Prop = Prop + v1 + "/" + v2;
  //   return SigWebGetProperty(Prop);
  // }

  // function SetAntiAliasEnable(v) {
  //   var Prop = "AntiAliasEnable/";

  //   Prop = Prop + v;
  //   SigWebSetPropertySync(Prop);
  // }

  // function GetAntiAliasEnable() {
  //   var Prop = "AntiAliasEnable";

  //   Prop = Prop;
  //   return SigWebGetProperty(Prop);
  // }

  // function SetUseAmbientColors(v) {
  //   var Prop = "UseAmbientColors/";

  //   Prop = Prop + v;
  //   SigWebSetPropertySync(Prop);
  // }

  // //
  // //		SigPlusNETDisplay.cs
  // //
  // function SetDisplayXSize(v) {
  //   var Prop = "DisplayXSize/";

  //   Prop = Prop + v;
  //   SigWebSetPropertySync(Prop);
  // }

  // function GetDisplayXSize() {
  //   var Prop = "DisplayXSize";

  //   Prop = Prop;
  //   return SigWebGetProperty(Prop);
  // }

  // function SetDisplayYSize(v) {
  //   var Prop = "DisplayYSize/";

  //   Prop = Prop + v;
  //   SigWebSetPropertySync(Prop);
  // }

  // function GetDisplayYSize() {
  //   var Prop = "DisplayYSize";

  //   Prop = Prop;
  //   return SigWebGetProperty(Prop);
  // }
  // function SetDisplayPenWidth(v) {
  //   var Prop = "DisplayPenWidth/";

  //   Prop = Prop + v;
  //   SigWebSetPropertySync(Prop);
  // }

  // function GetDisplayPenWidth() {
  //   var Prop = "DisplayPenWidth";

  //   Prop = Prop;
  //   return SigWebGetProperty(Prop);
  // }

  // function SetDisplayTimeStamp(v) {
  //   var Prop = "DisplayTimeStamp/";

  //   Prop = Prop + v;
  //   SigWebSetPropertySync(Prop);
  // }

  // function GetDisplayTimeStamp() {
  //   var Prop = "DisplayTimeStamp";

  //   Prop = Prop;
  //   return SigWebGetProperty(Prop);
  // }

  // function SetDisplayTimeStampPosX(v) {
  //   var Prop = "DisplayTimeStampPosX/";

  //   Prop = Prop + v;
  //   SigWebSetPropertySync(Prop);
  // }

  // function GetDisplayTimeStampPosX() {
  //   var Prop = "DisplayTimeStampPosX";

  //   Prop = Prop;
  //   return SigWebGetProperty(Prop);
  // }

  // function SetDisplayTimeStampPosY(v) {
  //   var Prop = "DisplayTimeStampPosY/";

  //   Prop = Prop + v;
  //   SigWebSetPropertySync(Prop);
  // }

  // function GetDisplayTimeStampPosY() {
  //   var Prop = "DisplayTimeStampPosY";

  //   Prop = Prop;
  //   return SigWebGetProperty(Prop);
  // }

  // function SetDisplayTimeStampSize(v) {
  //   var Prop = "DisplayTimeStampSize/";

  //   Prop = Prop + v;
  //   SigWebSetPropertySync(Prop);
  // }

  // function GetDisplayTimeStampSize() {
  //   var Prop = "DisplayTimeStampSize";

  //   Prop = Prop;
  //   return SigWebGetProperty(Prop);
  // }

  // function SetDisplayAnnotate(v) {
  //   var Prop = "DisplayAnnotate/";

  //   Prop = Prop + v;
  //   SigWebSetPropertySync(Prop);
  // }

  // function GetDisplayAnnotate() {
  //   var Prop = "DisplayAnnotate";

  //   Prop = Prop;
  //   return SigWebGetProperty(Prop);
  // }

  // function SetDisplayAnnotatePosX(v) {
  //   var Prop = "DisplayAnnotatePosX/";

  //   Prop = Prop + v;
  //   SigWebSetPropertySync(Prop);
  // }

  // function GetDisplayAnnotatePosX() {
  //   var Prop = "DisplayAnnotatePosX";

  //   Prop = Prop;
  //   return SigWebGetProperty(Prop);
  // }

  // function SetDisplayAnnotatePosY(v) {
  //   var Prop = "DisplayAnnotatePosY/";

  //   Prop = Prop + v;
  //   SigWebSetPropertySync(Prop);
  // }

  // function GetDisplayAnnotatePosY() {
  //   var Prop = "DisplayAnnotatePosY";

  //   Prop = Prop;
  //   return SigWebGetProperty(Prop);
  // }

  // function SetDisplayAnnotateSize(v) {
  //   var Prop = "DisplayAnnotateSize/";

  //   Prop = Prop + v;
  //   SigWebSetPropertySync(Prop);
  // }

  // function GetDisplayAnnotateSize() {
  //   var Prop = "DisplayAnnotateSize";

  //   Prop = Prop;
  //   return SigWebGetProperty(Prop);
  // }

  // //
  // //		SigPlusNETImage.cs
  // //
  // //		function  GetSigImageB64( )
  // //			{
  // //			var xhr2 = new XMLHttpRequest();
  // //			xhr2.open("GET", baseUri + "SigImage/1", false );
  // //			xhr2.responseType = "blob"
  // //			xhr2.send(null);
  // //			if (xhr2.readyState == 4 && xhr.status == 200)
  // //				{
  // //				return window.URL.createObjectURL(xhr2.response);
  // //				}
  // //			return null;
  // //			}

  // function SetImageXSize(v) {
  //   var Prop = "ImageXSize/";

  //   Prop = Prop + v;
  //   SigWebSetPropertySync(Prop);
  // }

  // function GetImageXSize() {
  //   var Prop = "ImageXSize";

  //   Prop = Prop;
  //   return SigWebGetProperty(Prop);
  // }

  // function SetImageYSize(v) {
  //   var Prop = "ImageYSize/";

  //   Prop = Prop + v;
  //   SigWebSetPropertySync(Prop);
  // }

  // function GetImageYSize() {
  //   var Prop = "ImageYSize";

  //   Prop = Prop;
  //   return SigWebGetProperty(Prop);
  // }

  // function SetImagePenWidth(v) {
  //   var Prop = "ImagePenWidth/";

  //   Prop = Prop + v;
  //   SigWebSetPropertySync(Prop);
  // }

  // function GetImagePenWidth() {
  //   var Prop = "ImagePenWidth";

  //   Prop = Prop;
  //   return SigWebGetProperty(Prop);
  // }

  // function SetImageTimeStamp(v) {
  //   var Prop = "ImageTimeStamp/";

  //   Prop = Prop + v;
  //   SigWebSetPropertySync(Prop);
  // }

  // function GetImageTimeStamp() {
  //   var Prop = "ImageTimeStamp";

  //   Prop = Prop;
  //   return SigWebGetProperty(Prop);
  // }

  // function SetImageTimeStampPosX(v) {
  //   var Prop = "ImageTimeStampPosX/";

  //   Prop = Prop + v;
  //   SigWebSetPropertySync(Prop);
  // }

  // function GetImageTimeStampPosX() {
  //   var Prop = "ImageTimeStampPosX";

  //   Prop = Prop;
  //   return SigWebGetProperty(Prop);
  // }

  // function SetImageTimeStampPosY(v) {
  //   var Prop = "ImageTimeStampPosY/";

  //   Prop = Prop + v;
  //   SigWebSetPropertySync(Prop);
  // }

  // function GetImageTimeStampPosY() {
  //   var Prop = "ImageTimeStampPosY";

  //   Prop = Prop;
  //   return SigWebGetProperty(Prop);
  // }

  // function SetImageTimeStampSize(v) {
  //   var Prop = "ImageTimeStampSize/";

  //   Prop = Prop + v;
  //   SigWebSetPropertySync(Prop);
  // }

  // function GetImageTimeStampSize() {
  //   var Prop = "ImageTimeStampSize";

  //   Prop = Prop;
  //   return SigWebGetProperty(Prop);
  // }

  // function SetImageAnnotate(v) {
  //   var Prop = "ImageAnnotate/";

  //   Prop = Prop + v;
  //   SigWebSetPropertySync(Prop);
  // }

  // function GetImageAnnotate() {
  //   var Prop = "ImageAnnotate";

  //   Prop = Prop;
  //   return SigWebGetProperty(Prop);
  // }

  // function SetImageAnnotatePosX(v) {
  //   var Prop = "ImageAnnotatePosX/";

  //   Prop = Prop + v;
  //   SigWebSetPropertySync(Prop);
  // }

  // function GetImageAnnotatePosX() {
  //   var Prop = "ImageAnnotatePosX";

  //   Prop = Prop;
  //   return SigWebGetProperty(Prop);
  // }

  // function SetImageAnnotatePosY(v) {
  //   var Prop = "ImageAnnotatePosY/";

  //   Prop = Prop + v;
  //   SigWebSetPropertySync(Prop);
  // }

  // function GetImageAnnotatePosY() {
  //   var Prop = "ImageAnnotatePosY";

  //   Prop = Prop;
  //   return SigWebGetProperty(Prop);
  // }

  // function SetImageAnnotateSize(v) {
  //   var Prop = "ImageAnnotateSize/";

  //   Prop = Prop + v;
  //   SigWebSetPropertySync(Prop);
  // }

  // function GetImageAnnotateSize() {
  //   var Prop = "ImageAnnotateSize";

  //   Prop = Prop;
  //   return SigWebGetProperty(Prop);
  // }

  // function SetJustifyX(v) {
  //   var Prop = "JustifyX/";

  //   Prop = Prop + v;
  //   SigWebSetPropertySync(Prop);
  // }

  // function GetJustifyX() {
  //   var Prop = "JustifyX";

  //   Prop = Prop;
  //   return SigWebGetProperty(Prop);
  // }

  // function SetJustifyY(v) {
  //   var Prop = "JustifyY/";

  //   Prop = Prop + v;
  //   SigWebSetPropertySync(Prop);
  // }

  // function GetJustifyY() {
  //   var Prop = "JustifyY";

  //   Prop = Prop;
  //   return SigWebGetProperty(Prop);
  // }

  // function SetJustifyMode(v) {
  //   var Prop = "JustifyMode/";

  //   Prop = Prop + v;
  //   SigWebSetPropertySync(Prop);
  // }

  // function GetJustifyMode() {
  //   var Prop = "JustifyMode";

  //   Prop = Prop;
  //   return SigWebGetProperty(Prop);
  // }

  // //
  // //		SigPlusNETKeyPad.cs
  // //
  // function KeyPadAddHotSpot(key, coord, xp, yp, xs, ys) {
  //   var Prop = "KeyPadAddHotSpot/";
  //   Prop = Prop + key + "," + coord + "," + xp + "," + yp + "," + xs + "," + ys;
  //   SigWebSetPropertySync(Prop);
  // }

  // function KeyPadMarkHotSpot(key, coord, xp, yp, xs, ys) {
  //   LCDWriteString(0, 2, xp, yp, "16pt sans-serif", 32, "+");
  //   LCDWriteString(0, 2, xp + xs, yp, "16pt sans-serif", 32, "+");
  //   LCDWriteString(0, 2, xp, yp + ys, "16pt sans-serif", 32, "+");
  //   LCDWriteString(0, 2, xp + xs, yp + ys, "16pt sans-serif", 32, "+");
  // }

  // function KeyPadQueryHotSpot(key) {
  //   var Prop = "KeyPadQueryHotSpot/";
  //   Prop = Prop + key;
  //   return SigWebGetProperty(Prop);
  // }

  // function KeyPadClearHotSpotList() {
  //   var Prop = "KeyPadClearHotSpotList";
  //   SigWebSetPropertySync(Prop);
  // }

  // function SetSigWindow(coords, xp, yp, xs, ys) {
  //   var Prop = "SigWindow/";

  //   Prop = Prop + coords + "," + xp + "," + yp + "," + xs + "," + ys;
  //   SigWebSetPropertySync(Prop);
  // }

  // function ClearSigWindow(inside) {
  //   var Prop = "ClearSigWindow/";
  //   Prop = Prop + inside;
  //   SigWebSetPropertySync(Prop);
  // }
  // //
  // //		SigPlusNETLCD.cs
  // //
  // function SetLCDCaptureMode(v) {
  //   var Prop = "CaptureMode/";

  //   Prop = Prop + v;
  //   SigWebSetPropertySync(Prop);
  // }

  // function GetLCDCaptureMode() {
  //   var Prop = "CaptureMode";

  //   Prop = Prop;
  //   return SigWebGetProperty(Prop);
  // }

  // function LCDSetWindow(xP, yP, xS, yS) {
  //   var Prop = "LCDSetWindow/";
  //   Prop = Prop + xP + "," + yP + "," + xS + "," + yS;
  //   SigWebSetPropertySync(Prop);
  // }

  // function LCDWriteString(dest, mode, x, y, fnt, size, str) {
  //   var c = document.createElement("canvas");
  //   var cntx = c.getContext("2d");
  //   cntx.font = fnt;
  //   var txt = str;
  //   var xs = Math.round(cntx.measureText(txt).width);
  //   var ys = size;
  //   c.width = xs;
  //   c.height = ys;

  //   if (xs == 0) {
  //     return;
  //   }

  //   cntx.font = fnt;
  //   cntx.fillStyle = "#FFFFFF";
  //   cntx.rect(0, 0, xs, ys);
  //   cntx.fill();

  //   cntx.fillStyle = "#000000";
  //   cntx.textBaseline = "top";
  //   cntx.fillText(txt, 0, 0);

  //   cntx.drawImage(cntx.canvas, 0, 0, xs, ys);

  //   var Gstr = createLcdBitmapFromCanvas(c, x, y, xs, ys);

  //   LcdWriteImageStream(dest, mode, x, y, xs, ys, Gstr);
  // }

  // function LCDDrawRectangle(dest, mode, x, y, xs, ys, fill) {
  //   var c = document.createElement("canvas");
  //   var cntx = c.getContext("2d");

  //   c.width = xs;
  //   c.height = ys;

  //   cntx.fillStyle = fill;
  //   cntx.rect(0, 0, xs, ys);
  //   cntx.fill();

  //   cntx.drawImage(cntx.canvas, 0, 0, xs, ys);
  //   var Gstr = createLcdBitmapFromCanvas(c, x, y, xs, ys);
  //   LcdWriteImageBlob(dest, mode, x, y, xs, ys, Gstr);
  // }

  // function LCDDrawButton(dest, mode, x, y, xs, ys, strys, fill, fnt, str) {
  //   var c = document.createElement("canvas");
  //   var cntx = c.getContext("2d");
  //   cntx.font = fnt;
  //   var txt = str;
  //   var sxs = Math.round(cntx.measureText(txt).width);
  //   var sys = strys;
  //   c.width = xs;
  //   c.height = ys;

  //   cntx.font = fnt;
  //   cntx.fillStyle = fill;
  //   cntx.rect(0, 0, xs, ys);
  //   cntx.fill();

  //   cntx.fillStyle = "#FFFFFF";
  //   cntx.textBaseline = "top";
  //   cntx.fillText(txt, (xs - sxs) / 2, (ys - sys) / 2);

  //   cntx.drawImage(cntx.canvas, 0, 0, xs, ys);

  //   var Gstr = createLcdBitmapFromCanvas(c, x, y, xs, ys);

  //   LcdWriteImageBlob(dest, mode, x, y, xs, ys, Gstr);
  // }

  // function LCDWriteStringWindow(dest, mode, x, y, fnt, xsize, ysize, str) {
  //   var c = document.createElement("canvas");
  //   var cntx = c.getContext("2d");
  //   cntx.font = fnt;
  //   var txt = str;
  //   var xs = xsize;
  //   var ys = ysize;
  //   c.width = xs;
  //   c.height = ys;

  //   cntx.font = fnt;
  //   cntx.fillStyle = "#FFFFFF";
  //   cntx.rect(0, 0, xs, ys);
  //   cntx.fill();

  //   cntx.fillStyle = "#000000";
  //   cntx.textBaseline = "top";
  //   cntx.fillText(txt, 0, 0);

  //   cntx.drawImage(cntx.canvas, 0, 0, xs, ys);

  //   var Gstr = createLcdBitmapFromCanvas(c, x, y, xs, ys);

  //   LcdWriteImageBlob(dest, mode, x, y, xs, ys, Gstr);
  // }

  // function LCDStringWidth(fnt, str) {
  //   var c = document.createElement("canvas");
  //   var cntx = c.getContext("2d");
  //   cntx.font = fnt;
  //   var txt = str;
  //   var xs = Math.round(cntx.measureText(txt).width);

  //   return xs;
  // }

  // function LCDStringHeight(fnt, str) {
  //   return 16;
  // }

  // function LcdRefresh(Mode, Xp, Yp, Xs, Ys) {
  //   var Prop = "LcdRefresh/";

  //   Prop = Prop + Mode + "," + Xp + "," + Yp + "," + Xs + "," + Ys;
  //   SigWebSetPropertySync(Prop);
  // }

  // function LCDSendCmdString(CmdStr, ReturnCount, Result, TimeOut) {
  //   var Prop = "LcdSendCmdString/";

  //   Prop = Prop + ReturnCount + "," + TimeOut;
  //   Result = SigWebSetStreamProperty(Prop, CmdStr);
  // }

  // function LCDSendCmdData(CmdStr, ReturnCount, Result, TimeOut) {
  //   var Prop = "LcdSendCmdData/";

  //   Prop = Prop + ReturnCount + "," + TimeOut;
  //   Result = SigWebSetStreamProperty(Prop, CmdStr);
  // }

  // // function LCDSendGraphicCanvas(dest, mode, x, y, canvas) {
  // // 	var Gstr = createLcdBitmapFromCanvas(canvas, 0, 0, xs, ys)
  // // 	LcdWriteImageStream(dest, mode, x, y, canvas.width, canvas.height, Gstr);
  // // }

  // //		function  LCDSendWindowedGraphicCanvas(  dest, mode,  x,  y, canvas )
  // //			 {
  // //			 }

  // //		function  LCDSendWindowedGraphicCanvas(  dest, mode,  x,  y,  xs,  ys, canvas )
  // //			{
  // //			var Gstr = createLcdBitmapFromCanvas( canvas, 0, 0, xs, ys)
  // //			LcdWriteImageStream( dest, mode, x, y, xs, ys, Gstr );
  // //			}

  // function LCDSendGraphicCanvas(dest, mode, x, y, canvas, xs, ys) {
  //   var Gstr = createLcdBitmapFromCanvas(canvas, 0, 0, xs, ys);
  //   LcdWriteImageStream(dest, mode, x, y, canvas.width, canvas.height, Gstr);
  // }

  // // function LCDSendWindowedGraphicCanvas(dest, mode, x, y, xs, ys, c, xps, yps) {
  // // 	var Gstr = createLcdBitmapFromCanvas(canvas, xps, yps, xs, ys)
  // // 	LcdWriteImageStream(dest, mode, x, y, xs, ys, Gstr);
  // // }

  // function LCDSendWindowedGraphicCanvas(
  //   dest,
  //   mode,
  //   x,
  //   y,
  //   xs,
  //   ys,
  //   canvas,
  //   xps,
  //   yps
  // ) {
  //   var Gstr = createLcdBitmapFromCanvas(canvas, xps, yps, xs, ys);
  //   LcdWriteImageStream(dest, mode, x, y, xs, ys, Gstr);
  // }

  // function LCDSendGraphicUrl(dest, mode, x, y, url) {
  //   LcdWriteImage(dest, mode, x, y, url);
  // }

  // //		function  LCDSendWindowedGraphicUrl(  dest, mode,  X,  Y, url )
  // //			{
  // //			}

  // //		function  LCDSendWindowedGraphicUrl(  dest, mode,  x,  y,  xs,  ys, url )
  // //			{
  // //			LcdWriteImageStream(dest, mode, x, y, xs, ys, url);
  // //			}

  // // function LCDSendWindowedGraphicUrl(dest, mode, x, y, xse, yse, url, xps, yps) {
  // // 	LcdWriteImageStream(dest, mode, x, y, xs, ys, url);
  // // }

  // function LCDSendWindowedGraphicUrl(dest, mode, x, y, xs, ys, url, xps, yps) {
  //   LcdWriteImageStream(dest, mode, x, y, xs, ys, url);
  // }

  // //		function  LCDSendGraphic(  Dest,  Mode,  XPos,  YPos,  ImageFileName ) {}
  // //		function  LCDSendGraphicURL(  Dest,  Mode,  XPos,  YPos,  URL ) {}

  // // function LCDClear() {
  // //   var Prop = "LcdClear";

  // //   Prop = Prop;
  // //   return SigWebGetProperty(Prop);
  // // }

  // // function LCDSetTabletMap(
  // //   LCDType,
  // //   LCDXSize,
  // //   LCDYSize,
  // //   LCDXStart,
  // //   LCDYStart,
  // //   LCDXStop,
  // //   LCDYStop
  // // ) {}

  // // function LCDSetPixelDepth(v) {
  // //   var Prop = "LcdSetPixelDepth/";

  // //   Prop = Prop + v;
  // //   SigWebSetPropertySync(Prop);
  // // }

  // // function LCDGetLCDSize() {
  // //   var Prop = "LcdGetLcdSize";

  // //   Prop = Prop;
  // //   return SigWebGetProperty(Prop);
  // // }

  // // function LCDSetCompressionMode(NewMode) {
  // // 	var Prop = "LcdCompressionMode/";

  // // 	Prop = Prop + v;
  // // 	SigWebSetPropertySync(Prop);
  // // }

  // // function LCDSetCompressionMode(NewMode) {
  // //   var Prop = "LcdCompressionMode/";

  // //   Prop = Prop + NewMode; // Use NewMode instead of undefined variable v
  // //   SigWebSetPropertySync(Prop);
  // // }

  // // function LCDGetCompressionMode() {
  // // 	var Prop = "LcdCompressionMode";

  // // 	Prop = Prop;
  // // 	return SigWebGetProperty(Prop);
  // // }

  // // function LCDSetZCompressionMode(NewMode) {
  // // 	var Prop = "LcdZCompressionMode/";

  // // 	Prop = Prop + v;
  // // 	SigWebSetPropertySync(Prop);
  // // }

  // // function LCDGetZCompressionMode() {
  // //   var Prop = "LcdZCompressionMode";

  // //   Prop = Prop;
  // //   return SigWebGetProperty(Prop);
  // // }
  // //
  // //		SigPlusNETLCD.cs
  // //

  // // function SetRealTabletState(v) {
  // //   var Prop = "TabletState/";

  // //   Prop = Prop + v;
  // //   SigWebSetPropertySync(Prop);
  // // }

  // // function GetTabletState() {
  // //   var Prop = "TabletState";

  // //   Prop = Prop;
  // //   return SigWebGetProperty(Prop);
  // // }

  // // function SetTabletLogicalXSize(v) {
  // //   var Prop = "TabletLogicalXSize/";

  // //   Prop = Prop + v;
  // //   SigWebSetPropertySync(Prop);
  // // }

  // // function GetTabletLogicalXSize() {
  // //   var Prop = "TabletLogicalXSize";

  // //   Prop = Prop;
  // //   return SigWebGetProperty(Prop);
  // // }

  // // function GetTabletLogicalYSize() {
  // //   var Prop = "TabletLogicalYSize";

  // //   Prop = Prop;
  // //   return SigWebGetProperty(Prop);
  // // }

  // // function SetTabletLogicalYSize(v) {
  // //   var Prop = "TabletLogicalYSize/";

  // //   Prop = Prop + v;
  // //   SigWebSetPropertySync(Prop);
  // // }

  // // function SetTabletXStart(v) {
  // //   var Prop = "TabletXStart/";

  // //   Prop = Prop + v;
  // //   SigWebSetPropertySync(Prop);
  // // }

  // // function GetTabletXStart() {
  // //   var Prop = "TabletXStart";

  // //   Prop = Prop;
  // //   return SigWebGetProperty(Prop);
  // // }

  // // function SetTabletYStart(v) {
  // //   var Prop = "TabletYStart/";

  // //   Prop = Prop + v;
  // //   SigWebSetPropertySync(Prop);
  // // }

  // // function GetTabletYStart() {
  // //   var Prop = "TabletYStart";

  // //   Prop = Prop;
  // //   return SigWebGetProperty(Prop);
  // // }

  // // function SetTabletXStop(v) {
  // //   var Prop = "TabletXStop/";

  // //   Prop = Prop + v;
  // //   SigWebSetPropertySync(Prop);
  // // }

  // // function GetTabletXStop() {
  // //   var Prop = "TabletXStop";

  // //   Prop = Prop;
  // //   return SigWebGetProperty(Prop);
  // // }

  // // function SetTabletYStop(v) {
  // //   var Prop = "TabletYStop/";

  // //   Prop = Prop + v;
  // //   SigWebSetPropertySync(Prop);
  // // }

  // // function GetTabletYStop() {
  // //   var Prop = "TabletYStop";

  // //   Prop = Prop;
  // //   return SigWebGetProperty(Prop);
  // // }

  // // function SetTabletFilterPoints(v) {
  // //   var Prop = "TabletFilterPoints/";

  // //   Prop = Prop + v;
  // //   SigWebSetPropertySync(Prop);
  // // }

  // // function GetTabletFilterPoints() {
  // //   var Prop = "TabletFilterPoints";

  // //   Prop = Prop;
  // //   return SigWebGetProperty(Prop);
  // // }

  // // function SetTabletTimingAdvance(v) {
  // //   var Prop = "TabletTimingAdvance/";

  // //   Prop = Prop + v;
  // //   SigWebSetPropertySync(Prop);
  // // }

  // // function GetTabletTimingAdvance() {
  // //   var Prop = "TabletTimingAdvance";

  // //   Prop = Prop;
  // //   return SigWebGetProperty(Prop);
  // // }

  // // function SetTabletComPort(v) {
  // //   var Prop = "TabletComPort/";

  // //   Prop = Prop + v;
  // //   SigWebSetPropertySync(Prop);
  // // }

  // // function GetTabletComPort() {
  // //   var Prop = "TabletComPort";

  // //   Prop = Prop;
  // //   return SigWebGetProperty(Prop);
  // // }

  // // function SetTabletBaudRate(v) {
  // //   var Prop = "TabletBaudRate/";

  // //   Prop = Prop + v;
  // //   SigWebSetPropertySync(Prop);
  // // }

  // // function GetTabletBaudRate() {
  // //   var Prop = "TabletBaudRate";

  // //   Prop = Prop;
  // //   return SigWebGetProperty(Prop);
  // // }

  // // function SetTabletRotation(v) {
  // //   var Prop = "TabletRotation/";

  // //   Prop = Prop + v;
  // //   SigWebSetPropertySync(Prop);
  // // }

  // // function GetTabletRotation() {
  // //   var Prop = "TabletRotation";

  // //   Prop = Prop;
  // //   return SigWebGetProperty(Prop);
  // // }

  // // function SetTabletType(v) {
  // //   var Prop = "TabletType/";

  // //   Prop = Prop + v;
  // //   SigWebSetPropertySync(Prop);
  // // }

  // // function GetTabletType() {
  // //   var Prop = "TabletType";

  // //   Prop = Prop;
  // //   return SigWebGetProperty(Prop);
  // // }

  // // function SetServerTabletType(v) {
  // //   var Prop = "ServerTabletType/";

  // //   Prop = Prop + v;
  // //   SigWebSetPropertySync(Prop);
  // // }

  // // function GetServerTabletType() {
  // //   var Prop = "ServerTabletType";

  // //   Prop = Prop;
  // //   return SigWebGetProperty(Prop);
  // // }

  // // function SetTabletComTest(v) {
  // //   var Prop = "TabletComTest/";

  // //   Prop = Prop + v;
  // //   SigWebSetPropertySync(Prop);
  // // }

  // // function GetTabletComTest() {
  // //   var Prop = "TabletComTest";

  // //   Prop = Prop;
  // //   return SigWebGetProperty(Prop);
  // // }

  // // function SetTabletResolution(v) {
  // //   var Prop = "TabletResolution/";

  // //   Prop = Prop + v;
  // //   SigWebSetPropertySync(Prop);
  // // }

  // // function GetTabletResolution() {
  // //   var Prop = "TabletResolution";

  // //   Prop = Prop;
  // //   return SigWebGetProperty(Prop);
  // // }

  // // function TabletConnectQuery() {
  // //   var Prop = "TabletConnectQuery";

  // //   Prop = Prop;
  // //   return SigWebGetProperty(Prop);
  // // }

  // // function TabletModelNumber() {
  // //   var Prop = "TabletModelNumber";

  // //   Prop = Prop;
  // //   return SigWebGetProperty(Prop);
  // // }

  // // function TabletSerialNumber() {
  // //   var Prop = "TabletSerialNumber";

  // //   Prop = Prop;
  // //   return SigWebGetProperty(Prop);
  // // }

  // // function SetTabletPortPath(v) {
  // //   var Prop = "TabletPortPath/";

  // //   Prop = Prop + v;
  // //   SigWebSetPropertySync(Prop);
  // // }

  // // function SetTabletLocalIniFilePath(v) {
  // //   var Prop = "TabletLocalIniFilePath/";

  // //   Prop = Prop + v;
  // //   SigWebSetPropertySync(Prop);
  // // }

  // // function SetTabletModel(v) {
  // //   var Prop = "TabletModel/";

  // //   Prop = Prop + v;
  // //   SigWebSetPropertySync(Prop);
  // // }

  // // function SetSerialPortCloseDelay(v) {
  // //   var Prop = "SerialPortCloseDelay/";

  // //   Prop = Prop + v;
  // //   SigWebSetPropertySync(Prop);
  // // }

  // // function GetSerialPortCloseDelay() {
  // //   var Prop = "SerialPortCloseDelay";

  // //   Prop = Prop;
  // //   return SigWebGetProperty(Prop);
  // // }

  // // function EnableTabletEncryption() {
  // //   var Prop = "EnableTabletEncryption";

  // //   Prop = Prop;
  // //   SigWebSetPropertySync(Prop);
  // // }

  // // function SetTabletEncryptionMode(hmode, tmode) {
  // //   var Prop = "TabletEncryptionMode/";

  // //   Prop = Prop + hmode + "," + tmode;
  // //   SigWebSetPropertySync(Prop);
  // // }

  // // function SetMaxLogFileSize(v) {
  // //   var Prop = "MaxLogFileSize/";

  // //   Prop = Prop + v;
  // //   SigWebSetPropertySync(Prop);
  // // }

  // // function GetSigSockServerPath() {
  // //   var Prop = "SigSockServerPath";

  // //   Prop = Prop;
  // //   return SigWebGetProperty(Prop);
  // // }

  // // function GetSigSockClientName() {
  // //   var Prop = "SigSockClientName";

  // //   Prop = Prop;
  // //   return SigWebGetProperty(Prop);
  // // }

  // // function GetSigSockPortNumber() {
  // //   var Prop = "SigSockPortNumber";

  // //   Prop = Prop;
  // //   return SigWebGetProperty(Prop);
  // // }

  // // function SetSigSockServerPath(v) {
  // //   var Prop = "SigSockServerPath/";

  // //   Prop = Prop + v;
  // //   SigWebSetPropertySync(Prop);
  // // }

  // // function SetSigSockClientName(v) {
  // //   var Prop = "SigSockClientName/";

  // //   Prop = Prop + v;
  // //   SigWebSetPropertySync(Prop);
  // // }

  // // function SetPortNumber(v) {
  // //   var Prop = "PortNumber/";

  // //   Prop = Prop + v;
  // //   SigWebSetPropertySync(Prop);
  // // }

  // function SetSigSockPortNumber(v) {
  //   var Prop = "SigSockPortNumber/";

  //   Prop = Prop + v;
  //   SigWebSetPropertySync(Prop);
  // }

  // function GetFirmwareRevision() {
  //   var Prop = "FirmwareRevision";

  //   Prop = Prop;
  //   return SigWebGetProperty(Prop);
  // }

  // function SetTabletData(sigStr) {
  //   var Prop = "TabletData";

  //   Prop = Prop;
  //   SigWebSetStreamProperty(Prop, sigStr);
  // }

  // function GetTabletData() {
  //   var Prop = "TabletData";

  //   Prop = Prop;
  //   var Str = SigWebGetProperty(Prop);

  //   return Str.slice(1, Str.length - 1);
  // }

  // function OpenTablet(v) {
  //   var Prop = "OpenTablet/";

  //   Prop = Prop + v;
  //   SigWebSetPropertySync(Prop);
  // }

  // function CloseTablet() {
  //   var Prop = "CloseTablet";

  //   Prop = Prop;
  //   SigWebSetProperty(Prop);
  // }

  // function ResetParameters() {
  //   var Prop = "ResetParameters";

  //   Prop = Prop;
  //   SigWebSetPropertySync(Prop);
  // }

  // function testRawData() {
  //   OpenTablet(1);
  //   var Str1 = GetTabletData();
  //   CloseTablet();
  // }

  // function Reset() {
  //   var Prop = "Reset";
  //   SigWebSetProperty(Prop);
  // }

  // function SetTabletState(v, ctx, tv) {
  //   var delay;

  //   if (tv) {
  //     delay = tv;
  //   } else {
  //     delay = 100;
  //   }

  //   if (GetTabletState() != v) {
  //     if (v == 1) {
  //       if (ctx) {
  //         var can = ctx.canvas;
  //         SetDisplayXSize(can.width);
  //         SetDisplayYSize(can.height);
  //         SigWebSetDisplayTarget(ctx);
  //       }
  //       SetRealTabletState(v);
  //       if (ctx && GetTabletState() != 0) {
  //         var tmr = setInterval(SigWebRefresh, delay);
  //       } else {
  //         var tmr = null;
  //       }

  //       return tmr;
  //     } else {
  //       if (ctx) {
  //         clearInterval(ctx);
  //       }
  //       SigWebSetDisplayTarget(null);
  //       SetRealTabletState(v);
  //     }
  //   }
  //   return null;
  // }

  /**
   * Created by Bradley Brandon on 9/4/19.
   */
  var tmr;

  // window.onunload = window.onbeforeunload = function () {
  //   closingSigWeb();
  // };

  // function closingSigWeb() {
  //   ClearTablet();
  //   SetTabletState(0, tmr);
  // }

  // useEffect(() => {
  //   GetSigImageB64(SigImageCallback);
  // }, [check]);
  // function onSign() {

  // function onSign() {
  //   var canvas = document.getElementById("cnv");

  //   if (canvas) {
  //     var ctx = canvas?.getContext("2d");
  //     SetDisplayXSize(500);
  //     SetDisplayYSize(100);
  //     SetTabletState(0, tmr);
  //     SetJustifyMode(0);
  //     ClearTablet();
  //     if (tmr == null) {
  //       tmr = SetTabletState(1, ctx, 50);

  //       // Display a prompt to the user
  //       Swal.fire({
  //         timer: 2000,
  //         title: "You can sign now",
  //         icon: "info",
  //         // confirmButtonText: "OK",
  //       });
  //     } else {
  //       SetTabletState(0, tmr);
  //       tmr = null;
  //       tmr = SetTabletState(1, ctx, 50);
  //     }
  //   } else {
  //     //   Swal.fire({
  //     //     icon: "error",
  //     //     title: "Error",
  //     //     text: "Canvas element with ID 'cnv' not found.",
  //     //   });
  //   }
  // }

  // function onClear() {
  //   setBase64String("");
  //   setRefresh(!refresh);
  //   ClearTablet();
  // }

  // function onDone() {
  //   console.log("NumberOfTabletPoints:::", NumberOfTabletPoints());
  //   if (NumberOfTabletPoints() == 0 && !base64String) {
  //     alert("Please sign before continuing");
  //   } else {
  //     SetTabletState(0, tmr);
  //     //RETURN TOPAZ-FORMAT SIGSTRING
  //     SetSigCompressionMode(1);
  //     if (document.sigForm) {
  //       document.sigForm.bioSigData.value = GetSigString();
  //       document.sigForm.sigStringData.value += GetSigString();
  //     }
  //     //this returns the signature in Topaz's own format, with biometric information

  //     //RETURN BMP BYTE ARRAY CONVERTED TO BASE64 STRING
  //     SetImageXSize(500);
  //     SetImageYSize(100);
  //     SetImagePenWidth(5);
  //     setCheck(!check);

  //     // console.log("base64:::", SigImageCallback)
  //   }
  // }

  function SigImageCallback(str) {
    // if(document.sigForm){
    // document.sigForm.sigImageData.value = str;
    setSigImageData(str);
    // }
  }

  ///////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////

  const [base64String, setBase64String] = useState("");
  const [relationNo, setRelationNo] = useState(id);
  // const [relationNo, setRelationNo] = useState("202302024071");
  const [pic, setPic] = useState("");
  const [signature, setSignature] = useState("");
  const [Imagbase64String, setImageBase64String] = useState("");
  const canvasRef = useRef(null);

  const handleFileChange = (event, canvasId, imageId) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result;
        setBase64String(base64String);

        // Call the handleImageCapture function passing the canvasId and imageId
        handleImageCapture(event, canvasId, imageId);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleFileChangeImage = (event) => {
    const canvas = canvasRef.current;

    if (event.target.files.length > 0) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = function (e) {
        const base64String = e.target.result;

        setImageBase64String(base64String);
        console.log("Image", base64String);
      };

      reader.readAsDataURL(file);
    }
  };

  const [isSignatureMode, setSignatureMode] = useState(true);

  const handleToggleMode = () => {
    setSignatureMode(!isSignatureMode);
  };

  // const handleSubmit = async () => {
  //   try {
  // onDone();

  //     let imageBase64;

  //     // Check if Imagbase64String is empty
  //     if (Imagbase64String) {
  //       imageBase64 = Imagbase64String;
  //     } else {
  //       // Check if capturedImage has a value
  //       if (capturedImage) {
  //         imageBase64 = capturedImage;
  //       } else {
  //         // Handle case when both Imagbase64String and capturedImage are empty
  //         console.error('Error: No image data available.');
  //         return;
  //       }
  //     }

  //     const data = {
  //       action: "add",
  //       relation_no: relationNo,
  //       pic: imageBase64,
  //       signature: sigImageData,
  //     };
  //     console.log(
  //       "image and signature with Data ::: =",
  //       data,
  //       GetSigImageB64((signatureBase64) => {
  //         // console.log(signatureBase64 , "jaj")
  //         // base64 = signatureBase64;
  //         return signatureBase64;
  //       })
  //     );
  //     // return;
  //     const response = await axios.post(
  //       "http://10.203.14.169/imaging_sig_api/api/capture.php",
  //       data,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     console.log("image and signature ::: =", JSON.stringify(response.data));

  //     Swal.fire({
  //       title: "Auto close alert!",
  //       text: "Signature Saved Successfully",
  //     });
  //     setImageBase64String("");
  //     setSigImageData("");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const [isSigned, setIsSigned] = useState(false);

  const [isUploading, setIsUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageBack, setSelectedImageBack] = useState(null);
  const [showArrow, setShowArrow] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showTooltipSign, setShowTooltipSign] = useState(false);

  const [isFlipped, setIsFlipped] = useState(false);

  const videoRef = useRef(null);
  // const [capturedImage, setCapturedImage] = useState(null);

  const handleCapture = () => {
    const video = videoRef.current;

    if (video) {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas
        .getContext("2d")
        .drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageDataURL = canvas.toDataURL("image/png");
      // imageDataURL contains the base64 encoded image data
      setCapturedImage(imageDataURL);
    }
  };

  console.log("capturedImage::", capturedImage);

  const handleStartCamera = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        const video = videoRef.current;
        if (video) {
          video.srcObject = stream;
        }
      })
      .catch((error) => {
        console.error("Error accessing the camera:", error);
      });
  };

  const tooltipContainerStyle = {
    position: "absolute",
  };

  const tooltipStyle = {
    backgroundColor: "#333",
    color: "#fff",
    padding: "8px",
    borderRadius: "4px",
    position: "relative",
    zIndex: "999",
    textAlign: "center",
    bottom: "-50px",
    right: "-190px",
    transform: "translateX(-199%)",
  };

  const arrowUpStyle = {
    width: "0",
    height: "0",
    borderTop: "8px solid transparent",
    borderBottom: "8px solid transparent",
    borderLeft: "8px solid #333",
    position: "absolute",
    bottom: "0",
    right: "-10px", // Align the arrow to the right edge of the tooltip
  };

  const handleArrowAnimation = () => {
    setShowArrow(true);
    setTimeout(() => setShowArrow(false), 3000); // Adjust the duration as needed
  };

  // const handleSignClick = () => {
  //   setIsSigned(true);
  //   setIsUploading(false);
  //   setSelectedImage(null); // Reset selected image when signing
  //   onSign();
  // };

  const handleUploadClick = () => {
    setIsUploading(true);
    setIsSigned(false);
  };

  const handleFileChangeNew = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChangeBack = (event) => {
    const file = event.target.files[0];

    if (file) {
      setIsUploading(true);

      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImageBack(reader.result);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleArrowClick = () => {
    setIsFlipped(!isFlipped);
  };

  const cardStyle = {
    backgroundImage: `url('https://img.freepik.com/free-photo/abstract-blue-extruded-voronoi-blocks-background-minimal-light-clean-corporate-wall-3d-geometric-surface-illustration-polygonal-elements-displacement_1217-2510.jpg?w=1380&t=st=1707041700~exp=1707042300~hmac=6a6d21b134a323acd06c65fe251b6692e197efe167c0cb0e296c11adf1ac3698')`,
    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
    transition: "transform 0.5s ease", // Add a smooth transition
  };

  // function ForSubmission(){
  //   onDone()
  // }

  // function ForSubmission() {
  //   // Check if the form and the required element are present
  //   if (document.sigForm && document.sigForm.bioSigData) {
  //     onDone();
  //   } else {
  //     console.error(
  //       "Form or form element not found. Check your HTML structure."
  //     );
  //   }
  // }

  // useEffect(() => {
  //   onSign();
  // }, [refresh]);

  const [carouselStep, setCarouselStep] = useState(0);

  // const handleNextStep = () => {
  //   setCarouselStep((prevStep) => prevStep + 1);
  // };
  const handleNextStep = () => {
    if (carouselStep === 0) {
      setCarouselStep(1); // Move to the next step
      // handleStartCamera()
    } else {
      setCarouselStep((prevStep) => prevStep - 1); // Move to the previous step
    }
  };

  const handlePrevStep = () => {
    setCarouselStep((prevStep) => prevStep - 1);
  };

  const handleReset = () => {
    setCarouselStep(0);
  };

  const [imageSignData, setImageSignData] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.post(
        "http://10.203.14.169/imaging_sig_api/api/update.php",
        {
          relation_no: relationNo,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Cookie: "PHPSESSID=9u2i0pl759h0nejqd3u2bb4hfc",
          },
        }
      );
      console.log("Get all data::", response.data.result);
      setImageSignData(response.data.result);
    } catch (error) {
      console.error(error);
    }
  };

  const handleButtonClick = (relationNumber) => {
    console.log("................................:", relationNo);
    open();
    setRelationNo(relationNumber);
    fetchData(); // Call fetchData when relation number is set
    handleShow();
  };

  console.log("Photo =:", imageSignData);
  console.log("Signature =:", imageSignData);

  return (
    <div>
      <div className="flex items-center">
        {/* <div  onClick={() => handleButtonClick(relationNo)}>
          View
        </div> */}

        <div className="flex items-center justify-center cursor-pointer" onClick={() => handleButtonClick(relationNo)}>
          <img
            src={`data:image/png;base64,${imageSignData.photo}`}
            className="w-24 rounded-md bg-white border-4 border-blue-500 border-dashed h-24  hover:shadow-gray-200 transition-all duration-200"
            alt="Base64 Image"
          />
          <img
            src={`data:image/png;base64,${imageSignData.accsign}`}
            className="w-24 rounded-md bg-white border-4 border-blue-500 border-dashed h-24  hover:shadow-gray-200 transition-all duration-200"
            alt="Base64 Image"
          />
        </div>
      </div>

      <Modal opened={opened} onClose={close} centered>
        {/* <Modal.Header>
          <Modal.Title>
            {carouselStep === 1 ? "Image Capture" :'Signature Capture'}
          </Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
          <div className="">
            <div className="w-full border border-gray-200 shadow-lg p-4 rounded">
              <div className="flex justify-between items-center ">
                {/* <div className=" -ml-3 -mr-3 rounded">
              <div className="pl-1 text-xl font-semibold  text-gray-600 dark:text-white">
                {carouselStep === 1 ? "Image Capture" :'Signature Capture'}
              </div>
            </div> */}
                <div
                  onClick={handleNextStep}
                  className="flex items-center space-x-2 cursor-pointer hover:animate-pulse"
                >
                  <span className="text-xs text-blue-500 font-medium ">
                    {/* Image Capture */}
                    {carouselStep === 1 ? "Image Capture" : "Signature Capture"}
                  </span>
                  <span>
                    <IoMdArrowRoundForward size={30} />
                  </span>
                </div>
              </div>
              <hr className="-ml-4 -mr-4 pt-2 mt-2" />

              {/* <canvas id="cnv"></canvas> */}

              {carouselStep === 0 && (
                <>
                  <div>
                    <text name="" id="" cols="30" rows="10">
                      RELATION NO:{" "}
                      <span className="text-xl font-bold"> {relationNo} </span>
                    </text>
                  </div>

                  <div>
                    <img
                      src={`data:image/png;base64,${imageSignData.accsign}`}
                      className="w-full rounded-md bg-white border-4 border-blue-500 border-dashed h-64  hover:shadow-gray-200 transition-all duration-200"
                      alt="Base64 Image"
                    />
                  </div>
                </>
              )}
              {carouselStep === 1 && (
                <>
                  <div>
                    <text name="" id="" cols="30" rows="10">
                      RELATION NO:{" "}
                      <span className="text-xl font-bold"> {relationNo} </span>
                    </text>
                  </div>
                  <div className="flex justify-center">
                    <div className="">
                      <img
                        id="capturedImage"
                        src={`data:image/png;base64,${imageSignData.photo}`}
                        className=" aspect-square rounded-md bg-white border-4 border-blue-500 border-dashed h-64  hover:shadow-gray-200 transition-all duration-200"
                        alt="Image"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="container mx-auto p-8 flex"></div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Signature_image_view;

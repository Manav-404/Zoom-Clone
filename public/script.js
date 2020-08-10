
let vidStream;
var peer = new Peer(undefined, {
	path: "/peerjs",
	host: "/",
	port: "3030",
});
const socket = io("/");
const vidGrid = document.getElementById("video-grid");
const vid = document.createElement("video");
vid.muted = true;

navigator.mediaDevices
	.getUserMedia({
		video: true,
		audio: true,
	})
	.then((stream) => {
		vidStream = stream;
		addVidStream(vid, vidStream);

		peer.on('call' , call => {
			call.answer(stream);
			const video = document.createElement('video');
			call.on('stream' , userVideoStream =>{
				addVidStream(video , stream);
	})

		})


		socket.on("user-connected", (userId ) => {
		connectToNewUser(userId ,stream);
		
});

	})
	.catch((err) => console.log(err));


peer.on("open", (id) => {
	socket.emit("join-room", ROOM_ID, id);
});


const connectToNewUser = (userId, stream) => {
	const call  = peer.call(userId , stream);
	const video = document.createElement('video');
	call.on('stream' , userVideoStream =>{
		addVidStream(video , stream);
	})

};

const addVidStream = (video, stream) => {
	video.srcObject = stream;
	video.addEventListener("loadedmetadata", () => {
		video.play();
	});

	vidGrid.append(video);
};

let msg = $('input')
		$('html').keydown((e)=>{
			if(e.which == 13 && msg.val().length!==0){
				socket.emit('message' , msg.val());
				msg.val('');
			}
		});

		socket.on('createMessage' , message=>{
			$('.messages').append(`<li class ="message"><b>user</b><br>${message}</li>`);
		})


const muteUnmute = () =>{
	const enabled = vidStream.getAudioTracks()[0].enabled;
	if(enabled){
		vidStream.getAudioTracks()[0].enabled = false;
		setUnMuteButton();
	}else{
		setMuteButton();
		vidStream.getAudioTracks()[0].enabled = true;
	}
}

const setUnMuteButton= () =>{
	const html =`
	<i class ="unmute fas fa-microphone-slash"></i>
	<span>Unmute</span>
	`

	document.querySelector('.main__mute__button').innerHTML = html
}

const setMuteButton = () =>{
	const html =`
	<i class ="mute fas fa-microphone"></i>
	<span>Mute</span>
	`

	document.querySelector('.main__mute__button').innerHTML = html
}


const playStop  =() =>{
	let enabled = vidStream.getVideoTracks()[0].enabled;
	if(enabled){
		vidStream.getVideoTracks()[0].enabled = false;
		setPlayVideo();
	}else{
		setStopVideo();
		vidStream.getVideoTracks()[0].enabled = true;
	}
}


const setPlayVideo= () =>{
	const html =`
	<i class ="stop fas fa-video-slash"></i>
	<span>Play Video</span>
	`

	document.querySelector('.main__video__button').innerHTML = html
}

const setStopVideo = () =>{
	const html =`
	<i class ="mute fas fa-video"></i>
	<span>Stop Video</span>
	`

	document.querySelector('.main__video__button').innerHTML = html
}
	
const splashScreen = document.getElementById('splash-screen');
const mainContent = document.getElementById('main-content');
const loginBtn = document.getElementById('login-btn');

loginBtn.addEventListener('click', function () {
    splashScreen.style.display = 'none';
    mainContent.style.display = 'block';
});
const postAddScreen = document.getElementById('add_post');
const mainContent1 = document.getElementById('main-content2');
const addScreen = document.getElementById('add');
const addedScreen = document.getElementById('send_btn_post');
addScreen.addEventListener('click', function () {
    postAddScreen.style.display = 'none';
    mainContent1.style.display = 'block';
});
addedScreen.addEventListener('click', function () {
    postAddScreen.style.display = 'block';
    mainContent1.style.display = 'none';
});

let post1 = {
    id:1,
    imageUrl: './man.jpg',
    description: 'salmorsalmorsalmorsalmor',
    createdAt: '2022-05-12 14:00:00',
    user: {
        id: 123
    }
};
function createCommentElement(comment) {
    const commentElement = document.createElement('div');
    commentElement.className = 'comment';

    const textElement = document.createElement('p');
    textElement.innerText = comment.text;

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const formattedDate = `${day}/${month}/${year}`;
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    const timeElement = document.createElement('p');
    timeElement.innerText = `${formattedDate} ${formattedTime}`;

    commentElement.appendChild(textElement);
    commentElement.appendChild(timeElement);
    return commentElement;
}
function createCommentFormElement(post) {
    const form = document.createElement('form');
    form.classList.add('comment-form', 'd-none');

    const userIdInput = document.createElement('input');
    userIdInput.type = 'hidden';
    userIdInput.name = 'userId';
    userIdInput.value = post.user;
    form.appendChild(userIdInput);

    const postIdInput = document.createElement('input');
    postIdInput.type = 'hidden';
    postIdInput.name = 'postId';
    postIdInput.value = post.id;
    form.appendChild(postIdInput);

    const textarea = document.createElement('textarea');
    textarea.classList.add('form-control', 'mb-2');
    textarea.name = 'comment';
    textarea.placeholder = 'Write a comment...';
    form.appendChild(textarea);

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.classList.add('btn', 'btn-primary');
    submitButton.textContent = 'Submit';
    form.appendChild(submitButton);

    return form;
}
function createPostElement(post) {
    const card = document.createElement('div');
    card.classList.add('card', 'mx-auto', 'mt-4');
    card.style.width = '25rem';

    const imageContainer = document.createElement('div');
    imageContainer.classList.add('position-relative');
    const image = document.createElement('img');
    image.src = post.imageUrl;
    image.classList.add('card-img-top');
    image.alt = 'post image';
    imageContainer.appendChild(image);
    const likeHeart = document.createElement('div');
    likeHeart.classList.add('h1', 'like-heart');
    const heartIcon = document.createElement('i');
    heartIcon.classList.add('bi', 'bi-suit-heart-fill');
    likeHeart.appendChild(heartIcon);
    imageContainer.appendChild(likeHeart);

    card.appendChild(imageContainer);

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const descriptionContainer = document.createElement('div');
    descriptionContainer.classList.add('card-description');

    const descriptionText = document.createElement('p');
    descriptionText.textContent = post.description;

    descriptionContainer.appendChild(descriptionText);

    cardBody.appendChild(descriptionContainer);

    const postActions = document.createElement('div');
    postActions.classList.add('post-actions');

    const likeButton = document.createElement('span');
    likeButton.classList.add('h3', 'mx-2', 'like-button', 'muted');
    const likeIcon = document.createElement('i');
    likeIcon.classList.add('bi', 'bi-suit-heart-fill');
    likeButton.appendChild(likeIcon);
    postActions.appendChild(likeButton);
    likeHeart.style.visibility = 'hidden';
    likeButton.addEventListener('click', function () {

        likeButton.classList.toggle('clicked');
    });

    image.addEventListener('dblclick', function () {
        likeButton.classList.toggle('clicked');
    });

    let clickCount1 = 0;

    image.addEventListener('dblclick', function () {
        clickCount1++;

        if (clickCount1 % 2 === 0) {
            likeHeart.classList.remove('active');
        } else {
            likeHeart.classList.add('active');
            likeHeart.style.visibility = 'visible'
            setTimeout(function () {
                likeHeart.classList.remove('active');
                likeHeart.style.visibility = 'hidden';
            }, 1000);

        }
    });

    likeButton.addEventListener('click', function () {
        likeButton.classList.toggle('active');
    });

    const commentButton = document.createElement('span');
    commentButton.classList.add('h3', 'mx-1', 'mt-0', 'comment-button', 'muted');
    const commentIcon = document.createElement('i');
    commentIcon.classList.add('bi', 'bi-chat-fill');
    commentButton.appendChild(commentIcon);
    postActions.appendChild(commentButton);

    const saveButton = document.createElement('span');
    saveButton.classList.add('h3', 'float-sm-right', 'mt-0', 'save-button');
    const saveIcon = document.createElement('i');
    saveIcon.classList.add('bi', 'bi-bookmark-fill');
    saveButton.appendChild(saveIcon);
    postActions.appendChild(saveButton);

    const commentForm = createCommentFormElement(post);
    cardBody.appendChild(commentForm);

    commentButton.addEventListener('click', () => {
        commentForm.classList.toggle('d-none');
    });

    commentForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(commentForm);
        const comment = {
            user: formData.get("userId"),
            post: formData.get("postId"),
            text: formData.get("comment")
        };
        const commentElement = createCommentElement(comment);
        cardBody.appendChild(commentElement);
        sendData(comment);

        commentForm.reset();
    });

    cardBody.appendChild(postActions);

    card.appendChild(cardBody);
    saveButton.addEventListener('click', function () {
        saveButton.classList.toggle('clicked');
    });
    return {card, likeButton};
}

function addPost(postElement) {
    const postsContainer = document.getElementById('main-content');
    postsContainer.appendChild(postElement.card);
}

addPost(createPostElement(post1))

const addPostForm = document.getElementById("post-form")
async function sendData(post) {
    try {
        const response = await axios.post("https://tested.free.beeceptor.com", post);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}

document.getElementById("send_btn_post").addEventListener("click", async (event) => {
    event.preventDefault();
    const formData = new FormData(addPostForm);
    const post = {
        imageUrl: formData.get("post-image").name,
        description: formData.get("post-description"),
        createdAt: '2022-05-12 14:00:00',
        user: {
            login: formData.get("user-id")
        }
    };
    console.log(formData);
    addPost(createPostElement(post));
    await sendData(post);
});
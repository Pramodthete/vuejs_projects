<script setup>

</script>

<template>
    <div class="outer">
        <svg xmlns="https://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" aria-hidden="true"
            jsname="jjf7Ff">
            <path fill="#4285F4"
                d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z">
            </path>
            <path fill="#34A853"
                d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z">
            </path>
            <path fill="#FBBC05"
                d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z">
            </path>
            <path fill="#EA4335"
                d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z">
            </path>
            <path fill="none" d="M2 2h44v44H2z"></path>
        </svg>
        <div class="wrapper">
            <div class="heading">
                <h1 style="font-size: 37px;color: black;">Create a Google Account</h1>
                <div style="font-family: Arial, Helvetica, sans-serif;">Enter your name</div>
            </div>
            <div class="inputs">
                <br>
                <input type="text" name="fname" id="fname" placeholder=" First Name"><br>
                <input type="text" name="lname" id="lname" placeholder=" Last Name (optional)">

            </div>
        </div><br>
        <button>next</button>
    </div>
    <div class="foot">
        <div>
            <select name="lang" id="lang">
                <option value="English (United States)">English (United States)</option>
                <option value="मराठी">मराठी</option>
                <option value="हिन्दी">हिन्दी</option>
                <option value="ગુજરાતી">ગુજરાતી</option>
                <option value="नेपाली">नेपाली</option>
                <option value="English (United Kingdom)">English (United Kingdom)</option>
            </select>
        </div>
        <div class="right-bottom">
            <a
                href="https://support.google.com/accounts?hl=en&visit_id=638530922477244333-1833003699&rd=2&p=account_iph#topic=3382296">
                <div>Help</div>
            </a>
            <a href="https://policies.google.com/privacy?gl=IN&hl=en">
                <div>Privacy</div>
            </a>
            <a href="https://policies.google.com/terms?gl=IN&hl=en">
                <div>Terms</div>
            </a>
        </div>
    </div>
</template>

<style scoped>
.outer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 12px;
    min-width: 1100px;
    padding: 3%;
    background-color: white;
    border-radius: 20px;
}

.wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 10%;
}

.inputs {
    display: flex;
    flex-direction: column;
}

input {
    height: 55px;
    width: 290%;
    border-radius: 4px;
    border: 1px solid black;
}

button {
    background-color: rgb(55, 67, 225);
    color: white;
    width: 80px;
    margin-left: 89%;
    cursor: pointer;
    /* padding-left: 0.2%;
    padding-right: 0.2%; */
    padding: 12px;
    border-radius: 25px;
    border: 1px solid white;
}

button:hover {
    background-color: rgb(12, 25, 211);
}

.foot {
    display: flex;
    justify-content: space-between;
    padding: 18px;
    padding-right: 50px;
}

.right-bottom {
    display: flex;
    gap: 25%;
    font-size: smaller;
}

a {
    text-decoration: none;
    color: black;
}

a:hover {
    background-color: rgb(227, 229, 229);
    cursor: pointer;
    border-radius: 6px;
    padding: 2px;
}

#lang {
    background-color: transparent;
    border: none;
    padding: 5px;
    border-radius: 5px;
}

#lang:hover {
    background-color: rgb(224, 224, 224);
    padding: 5px;
}
</style>
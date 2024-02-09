/* __placeholder__ */
export default (await import('vue')).defineComponent({
data() {
return {
selectedRating: 0,
comment: "",
submitted: false,
reaction: [
{ "name": "Tepat Waktu" },
]
};
},
methods: {
selectRating(rating) {
// Handle user's selection of the star rating
this.selectedRating = rating;
},
submitRating() {
// You can perform actions like sending the rating and comment to a server, updating a database, etc.
// For now, let's just set submitted to true.
this.submitted = true;
}
}
});

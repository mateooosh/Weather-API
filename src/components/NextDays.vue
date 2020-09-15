<template>
	<section class="nextdays">
		<div class="nextdays__info" :class="{weekend: (day=='Saturday' || day=='Sunday')}">
			<div class="nextdays__day">{{ day }}</div>
			<div class="nextdays__date">{{ date }}</div>
		</div>  

		<div class="nextdays__icon">
			<Icon01 v-if="icon=='01'"/>
			<Icon02 v-if="icon=='02'"/>
			<Icon03 v-if="icon=='03'"/>
			<Icon04 v-if="icon=='04'"/>
			<Icon09 v-if="icon=='09'"/>
			<Icon10 v-if="icon=='10'"/>
			<Icon11 v-if="icon=='11'"/>
			<Icon13 v-if="icon=='13'"/>
			<Icon50 v-if="icon=='50'"/>  
		</div>

		<div class="nextdays__main">
			<div class="nextdays__temperature">
				{{ temperature }}°C
			</div>

			<div class="nextdays__description">
				{{ description }}
			</div>
		</div>

		<div class="nextdays__details">
			<div class="nextdays__details-row">
				<div class="nextdays__details-title">
					PRESSURE
					<div class="nextdays__details-value">{{ pressure }}hPa</div>
				</div>

				<div class="nextdays__details-title">
					HUMIDITY
					<div class="nextdays__details-value">{{ humidity }}%</div>
				</div>

				<div class="nextdays__details-title">
					SUNRISE
					<div class="nextdays__details-value">{{ sunrise }}</div>
				</div>
			</div>


			<div class="nextdays__details-row">
				<div class="nextdays__details-title">
					FEELS LIKE
					<div class="nextdays__details-value">{{ feels_like }}°C</div>
				</div>

				<div class="nextdays__details-title">
					WIND
					<div class="nextdays__details-value">{{ wind }}km/h</div>
				</div>

				<div class="nextdays__details-title">
					SUNSET
					<div class="nextdays__details-value">{{ sunset }}</div>
				</div>
			</div>
		</div>

		<!-- {{data.daily[0].weather[0].description}} -->
	</section>
</template>

<script>
import Icon01 from './Icon01.vue';
import Icon02 from './Icon02.vue';
import Icon03 from './Icon03.vue';
import Icon04 from './Icon04.vue';
import Icon09 from './Icon09.vue';
import Icon10 from './Icon10.vue';
import Icon11 from './Icon11.vue';
import Icon13 from './Icon13.vue';
import Icon50 from './Icon50.vue';

export default {
	name: 'NextDays',

	components:{
		Icon01, Icon02, Icon03, Icon04, Icon09, Icon10, Icon11, Icon13, Icon50,
	},

	props:{
		//   data: Object,
		day: String,
		date: String,
		icon: String,
		temperature: Number,
		// place: String,
		// placeId: String,
		description: String,
		pressure: Number,
		humidity: Number,
		sunrise: String, 
		feels_like: Number,
		wind: Number,
		sunset: String
	},
	data () {
		return {
			
		}
	},
	methods:{
		
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.nextdays{
		background-color: #DADADA;
		width:760px;
		padding:0px 10px 0 0; 
		margin: 20px auto 0;
		color:rgb(39, 39, 39);
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-radius: 4px;

		&__info{
			width: 120px;
			background-color: rgba(56, 81, 121);
			height: 120px;
			border-top-left-radius: 4px;
			border-bottom-left-radius: 4px;
		}

		&__day{
			padding-top: 25px;
			text-align: center;
			font-weight: 300;
			color: #ddd;
			font-size: 20px;
		}

		&__date{
			text-align: center;
			color: #eee;
			font-size: 36px;
		}

		&__icon{
			padding: 5px 0;  
			text-align: center;
			height: 100px;
			width:200px;

			div{
				height: 100%;
			}
		}

		&__temperature{
			font-size: 42px;
			text-align: center;
		}

		&__description{
			text-align: center;
			font-size: 20px;
			
		}

		&__details{
			padding-right: 15px;
			&-row{
				display: flex;
				justify-content: space-between;

			&:nth-child(2){
				margin-top: 10px;
			}
		}

		&-title{
			font-weight: 400;
			font-size: 13px;
			text-align: center;

			&:nth-child(1){
				margin-right: 10px;
			}

			&:nth-child(2){
				margin-right: 10px;
			}
		}

		&-value{
			font-size: 14px;
			margin-top: 2px;
			font-weight: 700;
		}
	}
}

.weekend{
	background-color: rgb(156, 65, 65);
}

@media(max-width: 760px){
  .nextdays{
    width: 96%;
	margin-left: auto;
	margin-right: auto;
	margin-top: 10px;

	&__info{
		height: 80px;
		width: 80px;
	}

	&__day{
		padding-top: 16px;
		font-size: 14px;
	}

	&__date{
		font-size: 24px;
	}

	&__icon{
		width: 100px;
		height: 65px;
	}

	&__main{
		width: 120px;
	}

	&__temperature{
		font-size: 28px;
	}

	&__description{
		font-size: 16px;
	}

	&__details{
		padding-right:0;

		&-row{
			&:nth-child(2){
				margin-top: 7px;
			}
		}

		&-title{
			font-size: 11px;

			&:nth-child(1){
				margin-right: 4px;
			}

			&:nth-child(2){
				margin-right: 4px;
			}
		}

		&-value{
			font-size: 12px;
		}
	}
  }
}

@media(max-width: 500px){
  .nextdays{
	&__icon{
		width: 70px;
		height: 50px;
	}

	&__main{
		width: 80px;
	}

	&__temperature{
		font-size: 22px;
	}

	&__description{
		font-size: 12px;
	}

	&__details{

		&-title{
			font-size: 10px;
		}

		&-value{
			font-size: 9px;
		}
	}
  }
}

@media(max-width: 410px){
	
  	.nextdays{
		width: 98%;


		&__day{
			padding-top: 16px;
			font-size: 14px;
		}

		&__date{
			font-size: 24px;
		}

		&__icon{
			width: 100px;
			height: 65px;
		}

		&__main{
			width: 120px;
		}

		&__temperature{
			font-size: 28px;
		}

		&__description{
			font-size: 16px;
		}

		&__details{
			display: none;
		}
	}
}

</style>

<script>
    import dayjs from "dayjs";
    import relativeTime from "dayjs/plugin/relativeTime";
    import "dayjs/locale/fr";
    let { train } = $props();
    let localTrain = $state(train);
    let computedSpeedValue = $state(0);
    let lastContact = $state("");
    import { enableLights, disableLights, updateSpeed } from "$lib/store";

    dayjs.locale("fr");
    dayjs.extend(relativeTime);

    $effect(() => {
        localTrain.lights_on = train.lights_on;
        localTrain.speed = train.speed;
        localTrain.is_going_forward = train.is_going_forward;
        localTrain.last_contact = train.last_contact;

        lastContact = dayjs(localTrain.last_contact).fromNow()

        if (train.is_going_forward) {
            computedSpeedValue = train.speed;
        } else {
            computedSpeedValue = -train.speed;
        }
    });

    function changeLights(test) {
        localTrain.lights_on = test.target.checked;
        if (localTrain.lights_on === true) {
            enableLights(localTrain.name);
        } else {
            disableLights(localTrain.name);
        }
    }

    function stopTrain() {
        localTrain.speed = 0;
        localTrain.is_going_forward = true;
        computedSpeedValue = 0;
        updateSpeed(
            localTrain.name,
            localTrain.speed,
            localTrain.is_going_forward,
        );
    }

    function changeSpeed(test) {
        if (test.target.value > 0) {
            localTrain.is_going_forward = true;
            localTrain.speed = parseInt(test.target.value);
        } else {
            localTrain.is_going_forward = false;
            localTrain.speed = -parseInt(test.target.value);
        }
        computedSpeedValue = test.target.value;
        updateSpeed(
            localTrain.name,
            localTrain.speed,
            localTrain.is_going_forward,
        );
    }
</script>

<div
    class="jumbotron"
    style="background: #ddd; border-radius: 15px; display: flex; padding: 20px"
>
    <div>
        <img src="/trains/{localTrain.model.toLowerCase()}.png" />
    </div>
    <div style="margin-left: 15px">
        <h3>
            {localTrain.name}
            <span class="badge rounded-pill bg-info" style="font-size: 16px"
                >Modèle : {localTrain.model}</span
            >
            <span
                class="badge rounded-pill bg-secondary"
                style="font-size: 16px"
                >Dernier contact : {lastContact}</span
            >
        </h3>

        <div class="input-group">
            <label
                class="form-label"
                style="padding-right: 10px;"
                for="flexSwitchCheckChecked">Lumières</label
            >
            <input
                class="form-check-input"
                type="checkbox"
                value={localTrain.lights_on}
                id="flexSwitchCheckChecked"
                checked={localTrain.lights_on}
                onchange={changeLights}
            />
        </div>

        <div class="input-group mb-3">
            <label
                for="customRange3"
                class="form-label"
                style="padding-right: 10px;">Vitesse</label
            >
            <input
                type="range"
                class="input-group-text"
                min="-100"
                max="100"
                step="10"
                id="customRange3"
                list="labels"
                value={computedSpeedValue}
                onchange={changeSpeed}
            />
            <button
                class="btn btn-primary btn-sm"
                style="margin-left: 20px;"
                onclick={stopTrain}>Arrêter le train</button
            >

            <datalist id="labels" class="test">
                <option value="0" label="Arrêt"></option>
                <option value="100" label="Marche avant"></option>
                <option value="-100" label="Marche arrière"></option>
            </datalist>
        </div>
    </div>
</div>

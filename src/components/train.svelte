<script>
    import dayjs from "dayjs";
    import relativeTime from "dayjs/plugin/relativeTime";
    import "dayjs/locale/fr";
    let { train } = $props();
    import { setLight, setSpeed } from "$lib/store";

    dayjs.locale("fr");
    dayjs.extend(relativeTime);
</script>

<div
    class="jumbotron"
    style="background: #ddd; border-radius: 15px; display: flex; padding: 20px; margin-bottom: 20px"
>
    <div>
        <img src="/trains/{train.name.replace('Trainberry::', '').split('_')[0].toLowerCase()}.png" width="300" style="padding-right: 30px;" />
    </div>
    <div style="margin-left: 15px">
        <h3>
            {train.name.replace('Trainberry::', '')}
            <span class="badge rounded-pill bg-info" style="font-size: 16px"
                >Modèle : {train.name.replace('Trainberry::', '').split('_')[0]}</span
            >
            <span
                class="badge rounded-pill bg-secondary"
                style="font-size: 16px"
                >Nombre de communications en erreur : {train.error_count}</span
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
                value={train.light}
                id="flexSwitchCheckChecked"
                checked={train.light}
                onchange={(e) => setLight(train.name, e.target.checked)}
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
                value={train.speed}
                onchange={(e) => setSpeed(train.name, e.target.value)}
            />
            <button
                class="btn btn-primary btn-sm"
                style="margin-left: 20px;"
                onclick={() => setSpeed(train.name, 0)}>Arrêter le train</button
            >

            <datalist id="labels" class="test">
                <option value="0" label="Arrêt"></option>
                <option value="100" label="Marche avant"></option>
                <option value="-100" label="Marche arrière"></option>
            </datalist>
        </div>
    </div>
</div>

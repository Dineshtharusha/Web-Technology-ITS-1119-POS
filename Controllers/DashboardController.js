// ================ DASHBOARD CONTROLLER ================
class DashboardController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    refresh() {
        const data = this.model.getDashboardData();
        this.view.renderDashboard(data);
    }
}

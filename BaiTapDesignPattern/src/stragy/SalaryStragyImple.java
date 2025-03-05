package stragy;

class ThamNienSalaryStrategy implements SalaryStrategy {
    @Override
    public String tinhLuong() {
    	return "LCB" + 1000;
    }
}

class TienSiSalaryStrategy implements SalaryStrategy {
    @Override
    public String tinhLuong() {
    	return "LCB" + 1100;
    }
}

class ToTruongSalaryStrategy implements SalaryStrategy {
    @Override
    public String tinhLuong() {
    	return "LCB" + 1200;
    }
}

class TruongKhoaSalaryStrategy implements SalaryStrategy {
    @Override
    public String tinhLuong() {
    	return "LCB" + 1300;
    }
}

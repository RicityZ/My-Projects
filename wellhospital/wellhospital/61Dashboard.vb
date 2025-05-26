Imports System.Data.SqlClient
Imports System.Runtime.InteropServices
Imports System.Windows.Forms.DataVisualization.Charting

Public Class Dashboard
    Private Sub Form_Load(sender As Object, e As EventArgs) Handles MyBase.Load
        ' Connection string to the database
        Dim connectionString As String = "Data Source=KITTY\DB1101171;Initial Catalog=HOSPITAL;Integrated Security=True"

        ' Query to get count of each gender
        Dim querySex As String = "SELECT Staff_sex, COUNT(*) AS Count FROM Staff GROUP BY Staff_sex"
        LoadSexPieChart(ChartSex, querySex)
    End Sub

    Private Sub LoadSexPieChart(chart As Chart, query As String)
        chart.Series.Clear()
        chart.Titles.Clear()
        chart.Titles.Add("Sex of Staff")

        Dim series = chart.Series.Add("SexDistribution")
        series.ChartType = SeriesChartType.Pie

        ' Connecting to the database and loading data into the chart
        Dim connectionString As String = "Data Source=KITTY\DB1101171;Initial Catalog=HOSPITAL;Integrated Security=True"
        Using connection As New SqlConnection(connectionString)
            Using command As New SqlCommand(query, connection)
                connection.Open()
                Using reader = command.ExecuteReader()
                    While reader.Read()
                        Dim gender As String = reader("Staff_sex").ToString()
                        Dim count As Integer = Convert.ToInt32(reader("Count"))
                        series.Points.AddXY(gender, count)
                    End While
                End Using
            End Using
        End Using

        ' Show labels on pie chart slices
        series.IsValueShownAsLabel = True
    End Sub

    Private Sub Form1_Load1(sender As Object, e As EventArgs) Handles MyBase.Load
        ' Connection string to the database
        Dim connectionString As String = "Data Source=KITTY\DB1101171;Initial Catalog=HOSPITAL;Integrated Security=True"

        ' Query to get count of each position
        Dim queryPosition As String = "SELECT Staff_position, COUNT(*) AS Count FROM Staff GROUP BY Staff_position"
        LoadPositionChart(ChartPosition, queryPosition)
    End Sub

    Private Sub LoadPositionChart(chart As Chart, query As String)
        chart.Series.Clear()
        chart.Titles.Clear()
        chart.Titles.Add("Position of Staff")

        Dim series = chart.Series.Add("Staff Position")
        series.ChartType = SeriesChartType.Column ' ใช้ Column หรือ Bar Chart ก็ได้

        ' Connecting to the database and loading data into the chart
        Dim connectionString As String = "Data Source=KITTY\DB1101171;Initial Catalog=HOSPITAL;Integrated Security=True"
        Using connection As New SqlConnection(connectionString)
            Using command As New SqlCommand(query, connection)
                connection.Open()
                Using reader = command.ExecuteReader()
                    While reader.Read()
                        Dim position As String = reader("Staff_position").ToString()
                        Dim count As Integer = Convert.ToInt32(reader("Count"))
                        series.Points.AddXY(position, count)
                    End While
                End Using
            End Using
        End Using

        ' แสดง labels บนแต่ละ bar
        series.IsValueShownAsLabel = True

        ' ตั้งค่าพื้นหลังและเส้นกริดของ ChartArea
        With chart.ChartAreas(0)
            .BackColor = Color.Transparent
            .AxisX.MajorGrid.LineColor = Color.Transparent
            .AxisY.MajorGrid.LineColor = Color.Transparent
        End With
    End Sub

    Private Sub Form1_Load(sender As Object, e As EventArgs) Handles MyBase.Load
        ' Connection string ไปยังฐานข้อมูล
        Dim connectionString As String = "Data Source=KITTY\DB1101171;Initial Catalog=HOSPITAL;Integrated Security=True"

        ' Query เพื่อดึงข้อมูลประเภทการจ่ายเงิน
        Dim queryPayType As String = "SELECT Staff_payment_type, COUNT(*) AS Count FROM Staff GROUP BY Staff_payment_type"
        LoadPayTypePieChart(ChartPayType, queryPayType)
    End Sub

    Private Sub LoadPayTypePieChart(chart As Chart, query As String)
        chart.Series.Clear()
        chart.Titles.Clear()
        chart.Titles.Add("Staff Pay Type")

        Dim series = chart.Series.Add("Staff Pay Type")
        series.ChartType = SeriesChartType.Pie
        series.Palette = ChartColorPalette.SeaGreen
        series("PieLabelStyle") = "Outside"

        ' แสดง Label เป็นชื่อประเภทและตัวเลข
        series.Label = "#VALX #VALY"

        chart.ChartAreas(0).BackColor = Color.Transparent

        ' เชื่อมต่อฐานข้อมูลและเพิ่มข้อมูลลงใน Chart
        Dim connectionString As String = "Data Source=KITTY\DB1101171;Initial Catalog=HOSPITAL;Integrated Security=True"
        Using connection As New SqlConnection(connectionString)
            Using command As New SqlCommand(query, connection)
                connection.Open()
                Using reader = command.ExecuteReader()
                    While reader.Read()
                        Dim payType As String = reader("Staff_payment_type").ToString()
                        Dim count As Integer = Convert.ToInt32(reader("Count"))
                        series.Points.AddXY(payType, count)
                    End While
                End Using
            End Using
        End Using

        ' แสดง Label ที่เป็นชื่อของประเภทการจ่ายเงินพร้อมจำนวน
        series.IsValueShownAsLabel = True
    End Sub

    Private Sub Form3_Load(sender As Object, e As EventArgs) Handles MyBase.Load
        ' Connection string ไปยังฐานข้อมูล
        Dim connectionString As String = "Data Source=KITTY\DB1101171;Initial Catalog=HOSPITAL;Integrated Security=True"

        ' Query เพื่อดึงข้อมูล Sum ของเงินเดือนจากตำแหน่งใน Staff
        Dim querySalary As String = "SELECT Staff_position, SUM(Staff_salary) AS TotalSalary FROM Staff GROUP BY Staff_position"

        ' เรียกใช้ฟังก์ชันเพื่อโหลดข้อมูลเข้าไปใน Chart
        LoadSalaryChart(ChartSalary, querySalary)
    End Sub

    Private Sub LoadSalaryChart(chart As Chart, query As String)
        ' เคลียร์ข้อมูลเดิมใน Chart ก่อน
        chart.Series.Clear()
        chart.Titles.Clear()
        chart.Titles.Add("Sum of Salary with Position")

        ' สร้าง Series ใหม่และตั้งค่า ChartType เป็น Column
        Dim series = chart.Series.Add("Staff Salary")
        series.ChartType = SeriesChartType.Column
        series.Palette = ChartColorPalette.SeaGreen

        ' ตั้งค่า Chart Area ให้มีพื้นหลังโปร่งใส
        With chart.ChartAreas(0)
            .BackColor = Color.Transparent
            .AxisX.MajorGrid.LineColor = Color.Transparent
            .AxisY.MajorGrid.LineColor = Color.Transparent
        End With

        ' เชื่อมต่อกับฐานข้อมูลเพื่อดึงข้อมูลไปใส่ใน Chart
        Dim connectionString As String = "Data Source=KITTY\DB1101171;Initial Catalog=HOSPITAL;Integrated Security=True"
        Using connection As New SqlConnection(connectionString)
            Using command As New SqlCommand(query, connection)
                connection.Open()
                Using reader = command.ExecuteReader()
                    While reader.Read()
                        Dim position As String = reader("Staff_position").ToString()
                        Dim totalSalary As Integer = Convert.ToInt32(reader("TotalSalary"))
                        series.Points.AddXY(position, totalSalary)
                    End While
                End Using
            End Using
        End Using

        ' แสดง labels บนแต่ละ column
        series.IsValueShownAsLabel = True
    End Sub
    Private Sub Buttonhome_Click(sender As Object, e As EventArgs) Handles HOMEBUTT.Click
        homepage.Show()
        Me.Hide()

    End Sub
    Private Sub STAFFBUTTHOMEf_Click(sender As Object, e As EventArgs) Handles STAFFBUTTHOME.Click

        StaffForm.Show()
        Me.Hide()
    End Sub
    Private Sub PatientHOMEBUTT_Click(sender As Object, e As EventArgs) Handles PatientHOMEBUTT.Click
        PatientForm.Show()
        Me.Hide()
    End Sub

    Private Sub SuppliesBUTTHOME_Click(sender As Object, e As EventArgs) Handles SuppliesBUTTHOME.Click
        SupFrom.Show()
        Me.Hide()

    End Sub

    Private Sub SuppliersHOMEBUTT_Click(sender As Object, e As EventArgs) Handles SuppliersHOMEBUTT.Click
        supLIERfrom.Show()
        Me.Hide()
    End Sub

    Private Sub RequisitionHOMEBUTT_Click(sender As Object, e As EventArgs) Handles RequisitionHOMEBUTT.Click
        reqFrom.Show()
        Me.Hide()
    End Sub

    Private Sub DashboardHOMEBUTT_Click(sender As Object, e As EventArgs) Handles DashboardHOMEBUTT.Click
        Me.Show()
    End Sub
End Class
<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()> _
Partial Class PatientForm
    Inherits System.Windows.Forms.Form

    'Form overrides dispose to clean up the component list.
    <System.Diagnostics.DebuggerNonUserCode()> _
    Protected Overrides Sub Dispose(ByVal disposing As Boolean)
        Try
            If disposing AndAlso components IsNot Nothing Then
                components.Dispose()
            End If
        Finally
            MyBase.Dispose(disposing)
        End Try
    End Sub

    'Required by the Windows Form Designer
    Private components As System.ComponentModel.IContainer

    'NOTE: The following procedure is required by the Windows Form Designer
    'It can be modified using the Windows Form Designer.  
    'Do not modify it using the code editor.
    <System.Diagnostics.DebuggerStepThrough()> _
    Private Sub InitializeComponent()
        Me.Panel2 = New System.Windows.Forms.Panel()
        Me.Label1 = New System.Windows.Forms.Label()
        Me.Panel1 = New System.Windows.Forms.Panel()
        Me.DashboardHOMEBUTT = New System.Windows.Forms.Button()
        Me.RequisitionHOMEBUTT = New System.Windows.Forms.Button()
        Me.SuppliersHOMEBUTT = New System.Windows.Forms.Button()
        Me.SuppliesBUTTHOME = New System.Windows.Forms.Button()
        Me.STAFFBUTTHOME = New System.Windows.Forms.Button()
        Me.PatientHOMEBUTT = New System.Windows.Forms.Button()
        Me.HOMEBUTT = New System.Windows.Forms.Button()
        Me.Button9 = New System.Windows.Forms.Button()
        Me.Searchbtn = New System.Windows.Forms.Button()
        Me.ADDPATIENTBUTT = New System.Windows.Forms.Button()
        Me.Button3 = New System.Windows.Forms.Button()
        Me.Button10 = New System.Windows.Forms.Button()
        Me.Panel2.SuspendLayout()
        Me.Panel1.SuspendLayout()
        Me.SuspendLayout()
        '
        'Panel2
        '
        Me.Panel2.BackColor = System.Drawing.SystemColors.ActiveCaption
        Me.Panel2.Controls.Add(Me.Label1)
        Me.Panel2.Location = New System.Drawing.Point(182, 2)
        Me.Panel2.Margin = New System.Windows.Forms.Padding(4, 5, 4, 5)
        Me.Panel2.Name = "Panel2"
        Me.Panel2.Size = New System.Drawing.Size(1592, 117)
        Me.Panel2.TabIndex = 15
        '
        'Label1
        '
        Me.Label1.AutoSize = True
        Me.Label1.Font = New System.Drawing.Font("Microsoft Sans Serif", 21.75!, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.Label1.Location = New System.Drawing.Point(524, 39)
        Me.Label1.Margin = New System.Windows.Forms.Padding(4, 0, 4, 0)
        Me.Label1.Name = "Label1"
        Me.Label1.Size = New System.Drawing.Size(164, 52)
        Me.Label1.TabIndex = 0
        Me.Label1.Text = "Patient"
        '
        'Panel1
        '
        Me.Panel1.BackColor = System.Drawing.SystemColors.ActiveCaption
        Me.Panel1.Controls.Add(Me.DashboardHOMEBUTT)
        Me.Panel1.Controls.Add(Me.RequisitionHOMEBUTT)
        Me.Panel1.Controls.Add(Me.SuppliersHOMEBUTT)
        Me.Panel1.Controls.Add(Me.SuppliesBUTTHOME)
        Me.Panel1.Controls.Add(Me.STAFFBUTTHOME)
        Me.Panel1.Controls.Add(Me.PatientHOMEBUTT)
        Me.Panel1.Controls.Add(Me.HOMEBUTT)
        Me.Panel1.Location = New System.Drawing.Point(-2, 2)
        Me.Panel1.Margin = New System.Windows.Forms.Padding(4, 5, 4, 5)
        Me.Panel1.Name = "Panel1"
        Me.Panel1.Size = New System.Drawing.Size(188, 1014)
        Me.Panel1.TabIndex = 14
        '
        'DashboardHOMEBUTT
        '
        Me.DashboardHOMEBUTT.Location = New System.Drawing.Point(20, 692)
        Me.DashboardHOMEBUTT.Margin = New System.Windows.Forms.Padding(4, 5, 4, 5)
        Me.DashboardHOMEBUTT.Name = "DashboardHOMEBUTT"
        Me.DashboardHOMEBUTT.Size = New System.Drawing.Size(141, 83)
        Me.DashboardHOMEBUTT.TabIndex = 27
        Me.DashboardHOMEBUTT.Text = "Dashboard"
        Me.DashboardHOMEBUTT.UseVisualStyleBackColor = True
        '
        'RequisitionHOMEBUTT
        '
        Me.RequisitionHOMEBUTT.Location = New System.Drawing.Point(20, 588)
        Me.RequisitionHOMEBUTT.Margin = New System.Windows.Forms.Padding(4, 5, 4, 5)
        Me.RequisitionHOMEBUTT.Name = "RequisitionHOMEBUTT"
        Me.RequisitionHOMEBUTT.Size = New System.Drawing.Size(141, 83)
        Me.RequisitionHOMEBUTT.TabIndex = 26
        Me.RequisitionHOMEBUTT.Text = "Requisition"
        Me.RequisitionHOMEBUTT.UseVisualStyleBackColor = True
        '
        'SuppliersHOMEBUTT
        '
        Me.SuppliersHOMEBUTT.Location = New System.Drawing.Point(20, 474)
        Me.SuppliersHOMEBUTT.Margin = New System.Windows.Forms.Padding(4, 5, 4, 5)
        Me.SuppliersHOMEBUTT.Name = "SuppliersHOMEBUTT"
        Me.SuppliersHOMEBUTT.Size = New System.Drawing.Size(141, 83)
        Me.SuppliersHOMEBUTT.TabIndex = 25
        Me.SuppliersHOMEBUTT.Text = "Suppliers"
        Me.SuppliersHOMEBUTT.UseVisualStyleBackColor = True
        '
        'SuppliesBUTTHOME
        '
        Me.SuppliesBUTTHOME.Location = New System.Drawing.Point(20, 363)
        Me.SuppliesBUTTHOME.Margin = New System.Windows.Forms.Padding(4, 5, 4, 5)
        Me.SuppliesBUTTHOME.Name = "SuppliesBUTTHOME"
        Me.SuppliesBUTTHOME.Size = New System.Drawing.Size(141, 83)
        Me.SuppliesBUTTHOME.TabIndex = 24
        Me.SuppliesBUTTHOME.Text = "Supplies"
        Me.SuppliesBUTTHOME.UseVisualStyleBackColor = True
        '
        'STAFFBUTTHOME
        '
        Me.STAFFBUTTHOME.Location = New System.Drawing.Point(20, 146)
        Me.STAFFBUTTHOME.Margin = New System.Windows.Forms.Padding(4, 5, 4, 5)
        Me.STAFFBUTTHOME.Name = "STAFFBUTTHOME"
        Me.STAFFBUTTHOME.Size = New System.Drawing.Size(141, 83)
        Me.STAFFBUTTHOME.TabIndex = 23
        Me.STAFFBUTTHOME.Text = "STAFF"
        Me.STAFFBUTTHOME.UseVisualStyleBackColor = True
        '
        'PatientHOMEBUTT
        '
        Me.PatientHOMEBUTT.Location = New System.Drawing.Point(20, 254)
        Me.PatientHOMEBUTT.Margin = New System.Windows.Forms.Padding(4, 5, 4, 5)
        Me.PatientHOMEBUTT.Name = "PatientHOMEBUTT"
        Me.PatientHOMEBUTT.Size = New System.Drawing.Size(141, 83)
        Me.PatientHOMEBUTT.TabIndex = 22
        Me.PatientHOMEBUTT.Text = "Patient"
        Me.PatientHOMEBUTT.UseVisualStyleBackColor = True
        '
        'HOMEBUTT
        '
        Me.HOMEBUTT.Location = New System.Drawing.Point(20, 34)
        Me.HOMEBUTT.Margin = New System.Windows.Forms.Padding(4, 5, 4, 5)
        Me.HOMEBUTT.Name = "HOMEBUTT"
        Me.HOMEBUTT.Size = New System.Drawing.Size(141, 83)
        Me.HOMEBUTT.TabIndex = 21
        Me.HOMEBUTT.Text = "HOME"
        Me.HOMEBUTT.UseVisualStyleBackColor = True
        '
        'Button9
        '
        Me.Button9.Font = New System.Drawing.Font("Microsoft Sans Serif", 20.25!, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.Button9.Location = New System.Drawing.Point(1005, 305)
        Me.Button9.Margin = New System.Windows.Forms.Padding(4, 5, 4, 5)
        Me.Button9.Name = "Button9"
        Me.Button9.Size = New System.Drawing.Size(280, 186)
        Me.Button9.TabIndex = 18
        Me.Button9.Text = "WAITING LIST"
        Me.Button9.UseVisualStyleBackColor = True
        '
        'Searchbtn
        '
        Me.Searchbtn.Font = New System.Drawing.Font("Microsoft Sans Serif", 20.25!, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.Searchbtn.Location = New System.Drawing.Point(693, 305)
        Me.Searchbtn.Margin = New System.Windows.Forms.Padding(4, 5, 4, 5)
        Me.Searchbtn.Name = "Searchbtn"
        Me.Searchbtn.Size = New System.Drawing.Size(280, 186)
        Me.Searchbtn.TabIndex = 17
        Me.Searchbtn.Text = "SEARCH AND UPDATE PATIENT"
        Me.Searchbtn.UseVisualStyleBackColor = True
        '
        'ADDPATIENTBUTT
        '
        Me.ADDPATIENTBUTT.Font = New System.Drawing.Font("Microsoft Sans Serif", 20.25!, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.ADDPATIENTBUTT.Location = New System.Drawing.Point(381, 305)
        Me.ADDPATIENTBUTT.Margin = New System.Windows.Forms.Padding(4, 5, 4, 5)
        Me.ADDPATIENTBUTT.Name = "ADDPATIENTBUTT"
        Me.ADDPATIENTBUTT.Size = New System.Drawing.Size(280, 186)
        Me.ADDPATIENTBUTT.TabIndex = 16
        Me.ADDPATIENTBUTT.Text = "ADD NEW PATIENT"
        Me.ADDPATIENTBUTT.UseVisualStyleBackColor = True
        '
        'Button3
        '
        Me.Button3.Font = New System.Drawing.Font("Microsoft Sans Serif", 20.25!, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.Button3.Location = New System.Drawing.Point(872, 588)
        Me.Button3.Margin = New System.Windows.Forms.Padding(4, 5, 4, 5)
        Me.Button3.Name = "Button3"
        Me.Button3.Size = New System.Drawing.Size(280, 186)
        Me.Button3.TabIndex = 20
        Me.Button3.Text = "OUT PATIENT REPORT"
        Me.Button3.UseVisualStyleBackColor = True
        '
        'Button10
        '
        Me.Button10.Font = New System.Drawing.Font("Microsoft Sans Serif", 20.25!, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.Button10.Location = New System.Drawing.Point(560, 588)
        Me.Button10.Margin = New System.Windows.Forms.Padding(4, 5, 4, 5)
        Me.Button10.Name = "Button10"
        Me.Button10.Size = New System.Drawing.Size(280, 186)
        Me.Button10.TabIndex = 19
        Me.Button10.Text = "PATIENT IN WARD REPORT"
        Me.Button10.UseVisualStyleBackColor = True
        '
        'PatientForm
        '
        Me.AutoScaleDimensions = New System.Drawing.SizeF(9.0!, 20.0!)
        Me.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font
        Me.ClientSize = New System.Drawing.Size(1476, 1017)
        Me.Controls.Add(Me.Button3)
        Me.Controls.Add(Me.Button10)
        Me.Controls.Add(Me.Button9)
        Me.Controls.Add(Me.Searchbtn)
        Me.Controls.Add(Me.ADDPATIENTBUTT)
        Me.Controls.Add(Me.Panel2)
        Me.Controls.Add(Me.Panel1)
        Me.Margin = New System.Windows.Forms.Padding(4, 5, 4, 5)
        Me.Name = "PatientForm"
        Me.Text = "PatientForm"
        Me.Panel2.ResumeLayout(False)
        Me.Panel2.PerformLayout()
        Me.Panel1.ResumeLayout(False)
        Me.ResumeLayout(False)

    End Sub

    Friend WithEvents Panel2 As Panel
    Friend WithEvents Label1 As Label
    Friend WithEvents Panel1 As Panel
    Friend WithEvents Button9 As Button
    Friend WithEvents Searchbtn As Button
    Friend WithEvents ADDPATIENTBUTT As Button
    Friend WithEvents Button3 As Button
    Friend WithEvents Button10 As Button
    Friend WithEvents DashboardHOMEBUTT As Button
    Friend WithEvents RequisitionHOMEBUTT As Button
    Friend WithEvents SuppliersHOMEBUTT As Button
    Friend WithEvents SuppliesBUTTHOME As Button
    Friend WithEvents STAFFBUTTHOME As Button
    Friend WithEvents PatientHOMEBUTT As Button
    Friend WithEvents HOMEBUTT As Button
End Class
